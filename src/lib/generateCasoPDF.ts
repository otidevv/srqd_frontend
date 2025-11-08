import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import QRCode from 'qrcode'
import type { Caso } from '@/entities/caso/model/types'

/**
 * Opciones para generar el PDF del caso
 */
interface GeneratePDFOptions {
  caso: Caso
  firmaDataUrl?: string | null
}

// Cache global para logos (evita cargar en cada PDF)
let cachedLogoUnamad: string | null = null
let cachedLogoDefensoria: string | null = null

/**
 * Convierte un archivo de imagen a base64
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Carga una imagen desde una URL y la convierte a base64
 */
async function loadImageAsBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error('Error loading image:', error)
    throw error
  }
}

/**
 * Carga los logos con caché para mejorar rendimiento
 */
async function loadLogosWithCache(): Promise<{ logoUnamad: string; logoDefensoria: string }> {
  // Cargar logo UNAMAD si no está en caché
  if (!cachedLogoUnamad) {
    const logoUnamadUrl = '/img/logo/logo_withe_shadow.png'
    cachedLogoUnamad = await loadImageAsBase64(logoUnamadUrl)
  }

  // Cargar logo Defensoría si no está en caché
  if (!cachedLogoDefensoria) {
    const logoDefensoriaUrl = '/img/logo/logo_defensoria.png'
    cachedLogoDefensoria = await loadImageAsBase64(logoDefensoriaUrl)
  }

  return {
    logoUnamad: cachedLogoUnamad,
    logoDefensoria: cachedLogoDefensoria
  }
}

/**
 * Genera un PDF con los datos del caso SRQD
 */
export async function generateCasoPDF({ caso, firmaDataUrl }: GeneratePDFOptions): Promise<Blob> {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let yPosition = 20

  // Configuración de colores
  const primaryColor: [number, number, number] = [237, 20, 91] // #ed145b
  const darkGray: [number, number, number] = [60, 60, 60]
  const lightGray: [number, number, number] = [240, 240, 240]

  // ===== ENCABEZADO =====
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 45, 'F')

  // Cargar y agregar logos (con caché para optimizar)
  try {
    const { logoUnamad, logoDefensoria } = await loadLogosWithCache()

    // Logo UNAMAD a la izquierda
    doc.addImage(logoUnamad, 'PNG', 10, 8, 25, 25)

    // Logo Defensoría a la derecha
    doc.addImage(logoDefensoria, 'PNG', pageWidth - 35, 8, 25, 25)

    // Texto centrado
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('UNAMAD', pageWidth / 2, 12, { align: 'center' })

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text('Universidad Nacional Amazónica de Madre de Dios', pageWidth / 2, 18, { align: 'center' })

    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('DEFENSORÍA UNIVERSITARIA', pageWidth / 2, 25, { align: 'center' })

    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text('Sistema de Registro de Reclamos, Quejas y Denuncias', pageWidth / 2, 31, { align: 'center' })
  } catch (error) {
    console.error('Error loading logos:', error)
    // Si falla cargar los logos, mostrar solo texto centrado
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('UNAMAD', pageWidth / 2, 15, { align: 'center' })
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Universidad Nacional Amazónica de Madre de Dios', pageWidth / 2, 22, { align: 'center' })
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('Defensoría Universitaria', pageWidth / 2, 28, { align: 'center' })
  }

  yPosition = 55

  // ===== TÍTULO DEL DOCUMENTO =====
  doc.setTextColor(...darkGray)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')

  const tipoLabel = caso.tipo === 'reclamo' ? 'RECLAMO' :
                    caso.tipo === 'queja' ? 'QUEJA' : 'DENUNCIA'
  doc.text(`DOCUMENTO DE ${tipoLabel}`, pageWidth / 2, yPosition, { align: 'center' })
  yPosition += 10

  // Código de seguimiento
  doc.setFontSize(12)
  doc.setTextColor(...primaryColor)
  doc.text(`Código: ${caso.codigo}`, pageWidth / 2, yPosition, { align: 'center' })
  yPosition += 8

  // Fecha de registro
  doc.setFontSize(9)
  doc.setTextColor(...darkGray)
  const fechaRegistro = new Date(caso.fechaCreacion).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  doc.text(`Fecha de registro: ${fechaRegistro}`, pageWidth / 2, yPosition, { align: 'center' })
  yPosition += 12

  // ===== INFORMACIÓN DEL RECLAMANTE =====
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryColor)
  doc.text('1. DATOS DEL RECLAMANTE', 15, yPosition)
  yPosition += 7

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...darkGray)

  const reclamanteData = [
    ['Rol:', (caso.reclamante.rolReclamante || caso.reclamante.rol || 'N/A').toUpperCase()],
    ['Documento:', `${(caso.reclamante.tipoDocumento || 'N/A').toUpperCase()} - ${caso.reclamante.numeroDocumento || 'N/A'}`],
    ['Nombres completos:', `${caso.reclamante.nombres || ''} ${caso.reclamante.apellidoPaterno || ''} ${caso.reclamante.apellidoMaterno || ''}`.trim()],
    ['Sexo:', caso.reclamante.sexo === 'M' || caso.reclamante.sexo === 'masculino' ? 'Masculino' : 'Femenino'],
    ['Correo electrónico:', caso.reclamante.correo || 'N/A'],
    ['Teléfono/Celular:', caso.reclamante.celular || 'N/A'],
  ]

  if (caso.reclamante.codigo) {
    reclamanteData.push(['Código:', caso.reclamante.codigo])
  }
  if (caso.reclamante.programa) {
    reclamanteData.push(['Programa:', caso.reclamante.programa])
  }

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: reclamanteData,
    theme: 'plain',
    columnStyles: {
      0: { cellWidth: 45, fontStyle: 'bold' },
      1: { cellWidth: 130 }
    },
    styles: {
      fontSize: 9,
      cellPadding: 2,
    },
    margin: { left: 15 }
  })

  yPosition = (doc as any).lastAutoTable.finalY + 10

  // ===== INFORMACIÓN DEL RECLAMADO (solo si hay datos) =====
  const tieneReclamado = caso.reclamado && (
    caso.reclamado.nombres ||
    caso.reclamado.apellidoPaterno ||
    caso.reclamado.apellidoMaterno ||
    caso.reclamado.rolReclamado ||
    caso.reclamado.rol ||
    caso.reclamado.correo ||
    caso.reclamado.celular
  )

  if (tieneReclamado) {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('2. DATOS DEL RECLAMADO', 15, yPosition)
    yPosition += 7

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...darkGray)

    const reclamadoData: any[] = []

    // Solo agregar rol si existe
    if (caso.reclamado.rolReclamado || caso.reclamado.rol) {
      reclamadoData.push(['Rol:', (caso.reclamado.rolReclamado || caso.reclamado.rol || '').toUpperCase()])
    }

    // Agregar nombre completo si existe
    const nombreCompleto = `${caso.reclamado.nombres || ''} ${caso.reclamado.apellidoPaterno || ''} ${caso.reclamado.apellidoMaterno || ''}`.trim()
    if (nombreCompleto) {
      reclamadoData.push(['Nombres completos:', nombreCompleto])
    }

    // Solo agregar sexo si existe
    if (caso.reclamado.sexo) {
      const sexoTexto = caso.reclamado.sexo === 'M' || caso.reclamado.sexo === 'masculino' ? 'Masculino' : 'Femenino'
      reclamadoData.push(['Sexo:', sexoTexto])
    }

    if (caso.reclamado.correo) {
      reclamadoData.push(['Correo electrónico:', caso.reclamado.correo])
    }
    if (caso.reclamado.celular) {
      reclamadoData.push(['Teléfono/Celular:', caso.reclamado.celular])
    }

    autoTable(doc, {
      startY: yPosition,
      head: [],
      body: reclamadoData,
      theme: 'plain',
      columnStyles: {
        0: { cellWidth: 45, fontStyle: 'bold' },
        1: { cellWidth: 130 }
      },
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      margin: { left: 15 }
    })

    yPosition = (doc as any).lastAutoTable.finalY + 10
  }

  // Verificar si necesitamos una nueva página
  if (yPosition > 240) {
    doc.addPage()
    yPosition = 20
  }

  // ===== DESCRIPCIÓN DE HECHOS =====
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryColor)
  doc.text('3. DESCRIPCIÓN DE LOS HECHOS', 15, yPosition)
  yPosition += 7

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...darkGray)

  // Convertir HTML a texto plano (simple)
  const descripcionTexto = caso.descripcionHechos
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()

  const splitDescripcion = doc.splitTextToSize(descripcionTexto, pageWidth - 30)
  doc.text(splitDescripcion, 15, yPosition)
  yPosition += splitDescripcion.length * 5 + 10

  // Verificar si necesitamos una nueva página
  if (yPosition > 240) {
    doc.addPage()
    yPosition = 20
  }

  // ===== DERECHOS AFECTADOS =====
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...primaryColor)
  doc.text('4. DERECHOS AFECTADOS', 15, yPosition)
  yPosition += 7

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...darkGray)

  const derechosTexto = caso.derechosAfectados
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()

  const splitDerechos = doc.splitTextToSize(derechosTexto, pageWidth - 30)
  doc.text(splitDerechos, 15, yPosition)
  yPosition += splitDerechos.length * 5 + 10

  // Verificar si necesitamos una nueva página para la firma
  if (yPosition > 200) {
    doc.addPage()
    yPosition = 20
  }

  // ===== FIRMA DIGITAL =====
  if (firmaDataUrl) {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('5. FIRMA DEL RECLAMANTE', 15, yPosition)
    yPosition += 10

    try {
      // Agregar la imagen de la firma
      doc.addImage(firmaDataUrl, 'PNG', 15, yPosition, 80, 30)
      yPosition += 35

      // Línea de firma
      doc.setDrawColor(...darkGray)
      doc.line(15, yPosition, 95, yPosition)
      yPosition += 5

      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...darkGray)
      doc.text(`${caso.reclamante.nombres} ${caso.reclamante.apellidoPaterno}`, 15, yPosition)
      doc.text(`${caso.reclamante.tipoDocumento.toUpperCase()}: ${caso.reclamante.numeroDocumento}`, 15, yPosition + 4)
    } catch (error) {
      console.error('Error adding signature:', error)
    }
  }

  // ===== PIE DE PÁGINA =====
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(7)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `Sistema SRQD - Defensoría Universitaria UNAMAD | Página ${i} de ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  // ===== CÓDIGO QR PARA SEGUIMIENTO =====
  doc.setPage(totalPages)

  // Generar URL para el código QR
  const consultaUrl = `${window.location.origin}/consulta-publica?codigo=${caso.codigo}`

  try {
    // Generar código QR como data URL
    const qrDataUrl = await QRCode.toDataURL(consultaUrl, {
      width: 200,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    // Posicionar QR y nota en la parte inferior
    const bottomMargin = 50
    const qrSize = 35
    const qrX = pageWidth - qrSize - 15
    const qrY = doc.internal.pageSize.getHeight() - bottomMargin

    // Agregar QR code
    doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)

    // Texto explicativo del QR (a la derecha del código)
    doc.setFontSize(7)
    doc.setTextColor(...darkGray)
    doc.setFont('helvetica', 'bold')
    doc.text('Escanea para', qrX + (qrSize / 2), qrY + qrSize + 4, { align: 'center' })
    doc.text('consultar estado', qrX + (qrSize / 2), qrY + qrSize + 7, { align: 'center' })

    // Nota importante a la izquierda
    yPosition = doc.internal.pageSize.getHeight() - bottomMargin

    doc.setFillColor(...lightGray)
    doc.rect(15, yPosition - 5, pageWidth - qrSize - 35, 20, 'F')

    doc.setFontSize(7)
    doc.setTextColor(...darkGray)
    doc.setFont('helvetica', 'bold')
    doc.text('IMPORTANTE:', 20, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.text(
      `Guarde este documento y su código de seguimiento (${caso.codigo}).`,
      20,
      yPosition + 3.5
    )
    doc.text(
      'Puede consultar el estado de su caso en cualquier momento',
      20,
      yPosition + 7
    )
    doc.text(
      'escaneando el código QR o ingresando a nuestra página web.',
      20,
      yPosition + 10.5
    )

  } catch (error) {
    console.error('Error generating QR code:', error)

    // Fallback sin QR - solo mostrar nota importante
    yPosition = doc.internal.pageSize.getHeight() - 30

    doc.setFillColor(...lightGray)
    doc.rect(15, yPosition - 5, pageWidth - 30, 15, 'F')

    doc.setFontSize(7)
    doc.setTextColor(...darkGray)
    doc.setFont('helvetica', 'bold')
    doc.text('IMPORTANTE:', 20, yPosition)
    doc.setFont('helvetica', 'normal')
    doc.text(
      `Guarde este documento y su código de seguimiento (${caso.codigo}). Puede consultar el estado de su caso`,
      20,
      yPosition + 3.5
    )
    doc.text(
      'en cualquier momento ingresando este código en nuestra página de consulta pública.',
      20,
      yPosition + 7
    )
  }

  // Retornar el blob del PDF
  return doc.output('blob')
}

/**
 * Descarga el PDF generado
 */
export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Genera y descarga el PDF del caso
 */
export async function generateAndDownloadCasoPDF(
  caso: Caso,
  firmaDataUrl?: string | null,
  firmaFile?: File | null
): Promise<{ blob: Blob; filename: string }> {
  try {
    // Si tenemos un archivo de firma en lugar de dataUrl, convertirlo
    let finalFirmaDataUrl = firmaDataUrl

    if (firmaFile && !firmaDataUrl) {
      finalFirmaDataUrl = await fileToBase64(firmaFile)
    }

    // Generar el PDF
    const pdfBlob = await generateCasoPDF({ caso, firmaDataUrl: finalFirmaDataUrl })

    // Determinar el nombre del archivo
    const tipoPrefix = caso.tipo === 'reclamo' ? 'RECLAMO' :
                       caso.tipo === 'queja' ? 'QUEJA' : 'DENUNCIA'
    const filename = `${tipoPrefix}-${caso.codigo}.pdf`

    // Descargar
    downloadPDF(pdfBlob, filename)

    // Retornar el blob y filename para que se pueda subir al servidor
    return { blob: pdfBlob, filename }
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}
