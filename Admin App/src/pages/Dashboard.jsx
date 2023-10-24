import { useEffect, useState } from 'react'
import InfoBoard from '../components/InfoBoard'
import Transaction from '../components/Transaction'

const Dashboard = () => {
  const [infoBoard, setInfoBoard] = useState(null)
  const [transactions, setTransactions] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('http://localhost:5000/admin/dashboard')
        const data = await res.json()
        setInfoBoard({
          users: data.users,
          orders: data.orders,
          earnings: data.earnings,
          balance: data.balance,
        })
        setTransactions(data.latestTransactions)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])
  return (
    <>
      {infoBoard && <InfoBoard {...infoBoard} />}
      {transactions && <Transaction trans={transactions} />}
    </>
  )
}

export default Dashboard
