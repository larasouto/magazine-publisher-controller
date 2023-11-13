import { createContext, useContext, useState } from 'react'

type Item = {
  filesFolder: string
  files: File[]
}

type WeeklyReportContextProps = {
  images: Item[]
  addImages: (filesFolder: string, images: FileList) => void
  removeImage: (index: number) => void
}

type WeeklyReportProviderProps = {
  children: React.ReactNode
}

const WeeklyReportContext = createContext<WeeklyReportContextProps | null>(null)

export const WeeklyReportProvider = ({
  children
}: WeeklyReportProviderProps) => {
  const [images, setImages] = useState<Item[]>([])

  const addImages = (filesFolder: string, _images: FileList) => {
    const files = Array.from(_images)

    const isDuplicate = (file: File) =>
      images.some(
        (image) =>
          image.filesFolder === filesFolder &&
          Array.from(image.files).some(
            (existingFile) => existingFile.name === file.name
          )
      )

    const uniqueFiles = files.filter((file) => !isDuplicate(file))

    setImages((prev) => [
      ...prev,
      {
        filesFolder,
        files: uniqueFiles
      }
    ])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <WeeklyReportContext.Provider value={{ images, addImages, removeImage }}>
      {children}
    </WeeklyReportContext.Provider>
  )
}

export const useWeeklyReport = () => {
  const context = useContext(WeeklyReportContext)

  if (!context) {
    throw new Error(
      'useWeeklyReportContext must be used within a WeeklyReportProvider'
    )
  }

  return context
}
