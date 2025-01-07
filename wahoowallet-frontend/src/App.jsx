import style from './App.module.css'
import Header from './components/Baseplate/Header/Header.jsx';
import Sidebar from './components/Baseplate/Sidebar/Sidebar.jsx';

import { Outlet } from 'react-router';

export default function App() {
  return (
    <div className={style.root}>
      <Header />
      <div className={style.pageContent}>
        <Sidebar />
        <div className={style.outletContent}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}