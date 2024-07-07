'use client'

import EditorJS from '@editorjs/editorjs'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import '@/src/styles/editor.css'

interface EditorProps {}

type FormData = {
  content: any
}

type PostCreationRequest = {
  productId: string
  content: any
}

type Product = {
  id: string
  name: string
}

const Editor: React.FC<EditorProps> = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      content: null,
    },
  })
  const ref = useRef<EditorJS>()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  const savePost = async (payload: PostCreationRequest) => {
    setIsSaving(true)
    try {
      const { data } = await axios.post('/api/post/save', payload)
      console.log('Post saved successfully')
      return data
    } catch (error) {
      console.error('Your post was not saved. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    // @ts-ignore
    const Table = (await import('@editorjs/table')).default
    // @ts-ignore
    const List = (await import('@editorjs/list')).default
    // @ts-ignore
    const Code = (await import('@editorjs/code')).default
    // @ts-ignore
    const LinkTool = (await import('@editorjs/link')).default
    // @ts-ignore
    const InlineCode = (await import('@editorjs/inline-code')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link',
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          // embed: Embed,
        },
      })
    }
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        console.error((value as { message: string }).message)
      }
    }
  }, [errors])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()
    }

    if (isMounted) {
      init()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit() {
    if (!selectedProduct) {
      console.error('Please select a product')
      return
    }

    const blocks = await ref.current?.save()

    const payload: PostCreationRequest = {
      productId: selectedProduct,
      content: blocks,
    }

    await savePost(payload)
    router.push(`/products/${selectedProduct}`)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
      <form
        id='post-form'
        className='w-fit'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='prose prose-stone dark:prose-invert'>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <div id='editor' className='min-h-[500px]' />
          <div className='flex justify-between mt-4'>
            <button
              type='submit'
              disabled={isSaving || !selectedProduct}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300'
            >
              {isSaving ? 'Saving...' : 'Save and Submit'}
            </button>
          </div>
          <p className='text-sm text-gray-500 mt-2'>
            Use{' '}
            <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
              Tab
            </kbd>{' '}
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  )
}

export default Editor