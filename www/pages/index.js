import {
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  CheckIcon,
  WarningOutlineIcon,
  WarningFillIcon,
  InfoOutlineIcon,
  InfoFillIcon,
  SearchIcon,
  CalendarIcon,
  CoinIcon,
  MapMarkerIcon,
  StarIcon,
  PhoneIcon,
  LinkIcon,
} from '@bolid/mcqueen-icons'

import {
  Title
} from "@bolid/mcqueen-react"

const Card = ({ children }) => (
  <div className="max-w-5 rounded-big mx-auto bg-white shadow-1 p-5">
    { children }
  </div>
)

export default function Home() {
  return (
    <div className="h-screen bg-gray-200 pb-5 pt-6">
      <div className="wrap">
        <Title className="text-center mb-5" heading={1}>McQueen Playground</Title>
        <Card>
          <Title heading={2}>Icons</Title>
          {
            [
              ChevronUpIcon,
              ChevronRightIcon,
              ChevronDownIcon,
              ChevronLeftIcon,
              ArrowUpIcon,
              ArrowRightIcon,
              ArrowDownIcon,
              ArrowLeftIcon,
              CheckIcon,
              WarningOutlineIcon,
              WarningFillIcon,
              InfoOutlineIcon,
              InfoFillIcon,
              SearchIcon,
              CalendarIcon,
              CoinIcon,
              MapMarkerIcon,
              StarIcon,
              PhoneIcon,
              LinkIcon
            ].map((icon, i) => <span key={i}>{ icon({ size: 40 }) }</span>)
          }
        </Card>
      </div>
    </div>
  )
}
