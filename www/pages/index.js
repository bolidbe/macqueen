const Card = ({ children }) => (
  <div className="max-w-5 rounded-big mx-auto bg-white shadow-1 p-5">
    { children }
  </div>
)

export default function Home() {
  return (
    <div className="h-screen bg-gray-200 py-5">
      <div className="wrap">
        <Card>
          Lala
        </Card>
      </div>
    </div>
  )
}
