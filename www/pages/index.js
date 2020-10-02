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
  Title,
  Text,
  Button
} from "@bolid/mcqueen-react"
import colors from "@bolid/mcqueen-scss/config/colors.json"

const Card = ({ children, title }) => (
  <div className="max-w-6 rounded-big mx-auto bg-white shadow-1 p-5 mb-5">
    <Title heading={2} size={2} className="mb-5">{ title }</Title>
    { children }
  </div>
)

const ColorCard = ({ hex, name }) => (
  <div className="border rounded overflow-hidden mr-3" style={{ width: "130px" }}>
    <div className="mx-auto" style={{ backgroundColor: hex, height: "130px" }}></div>
    <Text className="border-t  py-2 text-center" size={3}> { name }</Text>
  </div>
)

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200 pb-5 pt-6">
      <div className="wrap">
        <Title className="text-center mb-6" heading={1}>McQueen Playground</Title>
        <Card title="Icon">
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
        <Card title="Typography">
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
              [...Array(4).keys()].map(i => (
                <Text key={i} size={i+1} isBold={true}>Bold body {i + 1}</Text>
              ))
            }
            {
              [...Array(4).keys()].map(i => (
                <Text key={i} size={i+1}>Body {i + 1}</Text>
              ))
            }
            </div>
          </div>
        </Card>
        <Card title="Color">
        {
          Object.keys(colors).filter(c => c !== "transparent" && c !== "white").map((color, i) => (
            <div key={i} className="mb-5">
              <Title className="mb-3" size={3}>{ color.charAt(0).toUpperCase() + color.slice(1) }</Title>
              <div className="flex">
                {
                  typeof colors[color] === "string" ? (
                    <ColorCard hex={colors[color]} name="default"/>
                  ) : Object.keys(colors[color]).map((c, j) => (
                    <ColorCard key={j} hex={colors[color][c]} name={c}/>
                  ))
                }
              </div>
            </div>
          ))
        }
        </Card>
        <Card title="Image">
        </Card>
        <Card title="Button">
          <Title className="mb-3" size={3}>Sizes</Title>
          <div className="flex items-end">
            <Button>Large button</Button>
            <Button className="ml-3" size="small">Small button</Button>
          </div>

          <Title className="mb-3 mt-6" size={3}>Themes</Title>
          <div className="flex flex-wrap">
            {
              ['primary', 'secondary', 'tertiary', 'caution'].map((theme, i) => (
                <Button key={i} className="mr-3 mb-3" theme={theme}>{ theme.charAt(0).toUpperCase() + theme.slice(1) }</Button>
              ))
            }
            <div className="bg-purple p-3">
              <Button theme="solid">Solid</Button>
            </div>
          </div>

          <Title className="mb-3 mt-6" size={3}>Variants</Title>
          <Title className="mb-3" size={4}>Loading</Title>
          <div className="flex flex-wrap">
            {
              ['primary', 'secondary', 'tertiary'].map((theme, i) => (
                <Button key={i} className="mr-3 mb-3" theme={theme} isLoading>{ theme.charAt(0).toUpperCase() + theme.slice(1) }</Button>
              ))
            }
          </div>
          <Title className="my-3" size={4}>Disabled</Title>
          <div className="flex flex-wrap">
            {
              ['primary', 'secondary', 'tertiary', 'caution'].map((theme, i) => (
                <Button key={i} className="mr-3 mb-3" theme={theme} isDisabled>{ theme.charAt(0).toUpperCase() + theme.slice(1) }</Button>
              ))
            }
            <div className="bg-purple p-3">
              <Button theme="solid" isDisabled>Solid</Button>
            </div>
          </div>
          <Title className="my-3" size={4}>With icon</Title>
          <div className="flex items-end">
            <Button iconLeft="calendar" size="large">Large button</Button>
            <Button className="ml-3" size="small" iconLeft="calendar">Small button</Button>
          </div>
        </Card>
        <Card title="Text Input">
        </Card>
        <Card title="Text Area">
        </Card>
        <Card title="Select">
        </Card>
        <Card title="Checkbox">
        </Card>
        <Card title="Radio">
        </Card>
        <Card title="Avatar">
        </Card>
        <Card title="Star Rating">
        </Card>
        <Card title="Alert">
        </Card>
        <Card title="Banner Alert">
        </Card>
      </div>
    </div>
  )
}
