import { Link } from 'react-router-dom'
import theFlexImg from './cover.png'

export default function TheFlex() {
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
      <main className="flex flex-col items-center justify-center mt-20">
        <img src={theFlexImg} alt="The flex" className='max-w-full h-auto rounded-lg' />
        <div className='my-10 self-end'>
          <Link to="/" className='text-[20px] underline'>← Назад ко всем проектам</Link>
        </div>
      </main>
    </div>
  )
}


