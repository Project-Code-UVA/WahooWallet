import style from './Header.module.css';

export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.titleSegment}>
        <p className={style.wahooTitle}>WahooWallet</p>
      </div>
    </div>
  )
}