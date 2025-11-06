import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RichTextEditor } from '../RichTextEditor'
import { toast } from 'sonner'

interface Step3Props {
  formData: any
  onNext: (data: any) => void
  onPrevious: () => void
}

export function Step3DescripcionForm({ formData, onNext, onPrevious }: Step3Props) {
  const [descripcionHechos, setDescripcionHechos] = useState(formData.descripcionHechos || '')
  const [derechosAfectados, setDerechosAfectados] = useState(formData.derechosAfectados || '')
  const { handleSubmit } = useForm()

  const onSubmit = () => {
    // Extract plain text from HTML to validate actual content length
    const extractTextFromHTML = (html: string): string => {
      const div = document.createElement('div')
      div.innerHTML = html
      return div.textContent || div.innerText || ''
    }

    const descripcionText = extractTextFromHTML(descripcionHechos).trim()
    const derechosText = extractTextFromHTML(derechosAfectados).trim()

    if (!descripcionHechos || descripcionText === '') {
      toast.error('Campo requerido', {
        description: 'La descripción de los hechos es obligatoria'
      })
      return
    }
    if (descripcionText.length < 20) {
      toast.error('Descripción muy corta', {
        description: `La descripción de hechos debe tener al menos 20 caracteres (actual: ${descripcionText.length})`
      })
      return
    }
    if (!derechosAfectados || derechosText === '') {
      toast.error('Campo requerido', {
        description: 'La descripción de derechos afectados es obligatoria'
      })
      return
    }
    if (derechosText.length < 20) {
      toast.error('Descripción muy corta', {
        description: `Los derechos afectados debe tener al menos 20 caracteres (actual: ${derechosText.length})`
      })
      return
    }
    onNext({ descripcionHechos, derechosAfectados })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
        <p className="text-sm font-semibold text-purple-700 mb-1">PASO 3: DESCRIPCIÓN DE LOS HECHOS</p>
        <p className="text-xs text-muted-foreground">
          Describa detalladamente los hechos y los derechos que considera afectados
        </p>
      </div>

      <div className="space-y-2">
        <Label>Descripción de los Hechos <span className="text-red-500">*</span></Label>
        <RichTextEditor
          content={descripcionHechos}
          onChange={setDescripcionHechos}
          placeholder="Describa detalladamente lo sucedido..."
        />
        <p className="text-xs text-muted-foreground">
          Sea lo más específico posible: fechas, lugares, personas involucradas, etc.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Derechos que Considere Afectados <span className="text-red-500">*</span></Label>
        <RichTextEditor
          content={derechosAfectados}
          onChange={setDerechosAfectados}
          placeholder="Indique qué derechos considera que fueron vulnerados..."
        />
        <p className="text-xs text-muted-foreground">
          Ejemplo: Derecho a la educación, debido proceso, igualdad de trato, etc.
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrevious} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button type="submit" className="gap-2">
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
