import { Link, useParams } from 'react-router-dom'

const projectMeta = {
  'the-flex': { title: 'The flex', color: '#0F7FA6' },
  'little-mind': { title: 'little mind', color: '#ED582E' },
  'meraki': { title: 'Meraki', color: '#7D002D' },
  'karachaevsk': { title: 'Karachaevsk', color: '#76992E' },
}

export default function Project() {
  const { slug } = useParams()
  const meta = projectMeta[slug] || { title: slug, color: '#D1D1D1' }

  return (
    <div className="flex min-h-screen w-full flex-col px-[6%] font-montserrat font-semibold">
      <header className='w-full'>
        <nav className="flex justify-between items-center mt-8 text-[32px]">
          <Link to="/">
            <h1 className=''>Света Магаяева</h1>
          </Link>
          <ul className='flex gap-x-[58px] font-normal text-[24px]'>
            <li><a href="#">Мои работы</a></li>
            <li><a href="#">Контакты</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        <h2 className='text-[90px] mb-12' style={{ color: meta.color }}>{meta.title}</h2>
        <p className='text-[24px] max-w-3xl'>
          Здесь будет описание проекта «{meta.title}». Добавьте изображения, блоки с задачами и решениями.
        </p>
        <div className='mt-10'>
          <Link to="/" className='text-[20px] underline'>← Назад ко всем проектам</Link>
        </div>
      </main>
    </div>
  )
}


