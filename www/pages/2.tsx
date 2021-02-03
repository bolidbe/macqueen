import { useState } from "react"
import classNames from "classnames"
import { includes, filter } from "lodash"
import { GetServerSideProps } from 'next'
import {
  ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, BucketIcon, CalendarIcon, CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, CoinIcon, CompassIcon, CrossIcon, EditIcon, FilterFillIcon, FilterOutlineIcon, InfoFillIcon, InfoOutlineIcon, LinkIcon, ListIcon, MapMarkerFillIcon, MapMarkerOutlineIcon, MinusIcon, PhoneIcon, PlusIcon, SearchIcon, StarIcon, StopFillIcon, WarningFillIcon, WarningOutlineIcon
} from '@bolid/mcqueen-icons'
import {
  Title,
  Text,
  Button,
  TextInput,
  TextArea,
  Select,
  Radio,
  Checkbox,
  StarRating,
  BannerAlert,
  Alert,
  Image,
  UserAvatar,
  EntityAvatar,
  FilterChip,
  ToggleChip,
  Modal,
  Tooltip,
  Breadcrumbs,
  HtmlContent,
  ShowMore,
  QueryPagination,
  StatePagination,
  PathPagination,
  Pill,
  Autosuggest
} from "@bolid/mcqueen-react"
const colors: any = require("@bolid/mcqueen-scss/config/colors.json")

const Card = ({ children, title }: any) => (
  <div className="max-w-6 rounded-big mx-auto bg-white shadow-1 p-5 mb-5">
    <Title heading={2} size={2} className="mb-5">{ title }</Title>
    { children }
  </div>
)

const Section = ({ children, title }: any) => (
  <div className="mb-5">
    <Title heading={2} size={3} className="mb-3">{ title }</Title>
    { children }
  </div>
)

const SubSection = ({ children, title }: any) => (
  <div className="my-3">
    <Title heading={2} size={4} className="mb-2">{ title }</Title>
    { children }
  </div>
)

const ColorCard = ({ hex, name }: any) => (
  <div className="border rounded overflow-hidden mr-3" style={{ width: "130px" }}>
    <div className="mx-auto" style={{ backgroundColor: hex, height: "130px" }}></div>
    <Text className="border-t  py-2 text-center" size={3}> { name }</Text>
  </div>
)

type AvatarSizeType = "small" | "medium" | "large" | "xlarge" | "xsmall"
const avatarSizes: AvatarSizeType[] = ["xlarge", "large", "medium", "small", "xsmall"]

type ButtonThemeType = "primary" | "secondary" | "tertiary" | "caution" | "solid"
const buttonThemes: ButtonThemeType[] = ['primary', 'secondary', 'tertiary', 'caution']

type TextSizeType = 1 | 2 | 3 | 4
const textSizes: TextSizeType[] = [1, 2, 3, 4]

type TitleSizeType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
const titleSizes: TitleSizeType[] = [1, 2, 3, 4, 5, 6, 7, 8]

const SearchAutosuggest = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [value, setValue] = useState(null)

  const handleChange = (val) => {
    setSearchTerm(val)
  }

  const handleSelect = (val) => {
    setValue(val)
  }

  const options = filter([{
    label: "First",
    value: "First"
  }, {
    label: "Second",
    value: "Second"
  }, {
    label: "Third",
    value: "Third"
  }], option => searchTerm === "" || includes(option.label.toLowerCase(), searchTerm))

  return (
    <>
      <Autosuggest
        iconLeft="search"
        label="Search for something"
        placeholder="Placeholder"
        options={options}
        onSelect={handleSelect}
        onChange={handleChange}
        value={searchTerm}
      />
      <Text size={4} className="mt-1">
      Selected value : { value ? value : "Nothing yet..." }
      </Text>
    </>
  )
}

export default function Home() {
  const [textInput, setTextInput] = useState("")
  const [smallWidthModalIsOpen, setSmallWidthModalIsOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [largeWidthModalIsOpen, setLargeWidthModalIsOpen] = useState(false)
  const [mediumHeightModalIsOpen, setMediumHeightModalIsOpen] = useState(false)
  const [largeHeightModalIsOpen, setLargeHeightModalIsOpen] = useState(false)
  const [showMoreIsExpanded, setShowMoreIsExpanded] = useState(false)

  return (
    <div className="min-h-screen bg-gray-200 pb-5 pt-6">
      <div className="wrap">
        <Title className="text-center mb-6" heading={1}>McQueen Playground</Title>

        <Card title="Pagination">
          <Section title="Using local state">
            <StatePagination page={2} pagesCount={10} onClick={() => {}}/>
          </Section>
          <Section className="mt-5" title="Using query string parameter">
            <QueryPagination pagesCount={10}/>
          </Section>
          <Section className="mt-5" title="Using url path">
            <PathPagination page={2} path="" pagesCount={10}/>
          </Section>
        </Card>
        <Card title="Autosuggest">
          <SearchAutosuggest/>
        </Card>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  }
}
