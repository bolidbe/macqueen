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
  <div className="max-w-5 rounded-big mx-auto bg-white shadow-1 p-5 mb-5">
    { children }
  </div>
)

export default function Home() {
  return (
    <div className="h-screen bg-gray-200 pb-5 pt-6">
      <div className="wrap">
        <Title className="text-center mb-6" heading={1}>McQueen Playground</Title>
        <Card>
          <Title heading={2} size={2} className="mb-3">Icons</Title>
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
        <Card>
          <Title heading={2} size={2} className="mb-3">Typography</Title>
          <div className="flex">
            <div className="w-1/2">
            {
              [...Array(8).keys()].map(i => (
                <Title key={i} size={i+1}>Heading {i + 1}</Title>
              ))
            }
            </div>
            <div className="w-1/2">
            {
              [...Array(8).keys()].map(i => (
                <Title key={i} size={i+1}>Heading {i + 1}</Title>
              ))
            }
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
