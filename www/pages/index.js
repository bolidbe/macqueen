import { useState } from "react"
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
  Button,
  TextInput,
  TextArea,
  Select,
  Radio,
  Checkbox,
  StarRating,
  BannerAlert,
  Alert,
  Image
} from "@bolid/mcqueen-react"
import colors from "@bolid/mcqueen-scss/config/colors.json"

const Card = ({ children, title }) => (
  <div className="max-w-6 rounded-big mx-auto bg-white shadow-1 p-5 mb-5">
    <Title heading={2} size={2} className="mb-5">{ title }</Title>
    { children }
  </div>
)

const Section = ({ children, title }) => (
  <div className="mb-5">
    <Title heading={2} size={3} className="mb-3">{ title }</Title>
    { children }
  </div>
)

const SubSection = ({ children, title }) => (
  <div className="my-3">
    <Title heading={2} size={4} className="mb-2">{ title }</Title>
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
  const [textInput, setTextInput] = useState("")
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
          <Image
            src="https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/768.jpeg"
            containerAspectRatio={728 / 485}
            sources={[
              {
                type: 'image/webp',
                srcSet: `
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/120.webp 120w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/320.webp 320w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/400.webp 400w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/640.webp 640w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/768.webp 768w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.webp 1024w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1366.webp 1366w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1600.webp 1600w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1920.webp 1920w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2200.webp 2200w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2350.webp 2350w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2560.webp 2560w
                `,
              },
              {
                type: 'image/jpeg',
                srcSet: `
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/120.jpeg 120w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/320.jpeg 320w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/400.jpeg 400w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/640.jpeg 640w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/768.jpeg 768w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.jpeg 1024w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1366.jpeg 1366w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1600.jpeg 1600w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1920.jpeg 1920w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2200.jpeg 2200w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2350.jpeg 2350w,
                  https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/2560.jpeg 2560w
                `,
              },
            ]}
            alt="Cat laying in the sun"
          />
        </Card>


        <Card title="Button">
          <Section title="Sizes">
            <div className="flex items-end">
              <Button>Large button</Button>
              <Button className="ml-3" size="small">Small button</Button>
            </div>
          </Section>

          <Section title="Themes">
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
          </Section>

          <Section title="Variants">
            <SubSection title="Loading">
              <div className="flex flex-wrap">
                {
                  ['primary', 'secondary', 'tertiary'].map((theme, i) => (
                    <Button key={i} className="mr-3 mb-3" theme={theme} isLoading>{ theme.charAt(0).toUpperCase() + theme.slice(1) }</Button>
                  ))
                }
              </div>
            </SubSection>
            <SubSection title="States">
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
            </SubSection>
            <SubSection title="With icon">
              <div className="flex items-end">
                <Button iconLeft="calendar" size="large">Large button</Button>
                <Button className="ml-3" size="small" iconLeft="calendar">Small button</Button>
              </div>
            </SubSection>
          </Section>
        </Card>


        <Card title="Text Input">
          <Section title="With or without icon">
            <div className="flex">
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                iconLeft="search"
                className="w-full"
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3 w-full"
              />
            </div>
          </Section>
          <Section title="Sizes">
            <div className="flex items-end">
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                iconLeft="search"
                size="large"
                className="w-full"
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3 w-full"
                iconLeft="search"
                size="small"
              />
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                iconLeft="search"
                size="large"
                isDisabled
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3"
                iconLeft="search"
                isReadOnly
              />
              <TextInput
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3"
                iconLeft="search"
                hasError
              />
            </div>
          </Section>
          <Section title="Label & Note">
            <div className="flex items-end">
              <TextInput
                label="Label"
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="w-full"
                size="large"
                note="This field should contain @"
              />
              <TextInput
                label="Label"
                value={textInput}
                onChange={setTextInput}
                placeholder="example@example.com"
                className="ml-3 w-full"
                size="small"
                note="This field should contain @"
              />
            </div>
          </Section>
        </Card>
        <Card title="Text Area">
          <Section title="States">
            <TextArea
              value={textInput}
              onChange={setTextInput}
              placeholder="example@example.com"
              label="Label"
              note="This is a note"
            />
            <TextArea
              value={textInput}
              onChange={setTextInput}
              placeholder="example@example.com"
              label="Label"
              note="This is a note"
              isDisabled
              className="mt-3"
            />
            <TextArea
              value={textInput}
              onChange={setTextInput}
              placeholder="example@example.com"
              label="Label"
              note="This is a note"
              hasError
              className="mt-3"
            />
          </Section>
        </Card>
        <Card title="Select">
          <Section title="Sizes">
            <div className="flex items-end">
              <Select label="Label" note="Note" className="w-full">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
              <Select label="Label" note="Note" size="small" className="w-full ml-3">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <Select label="Label" note="Note" hasError className="w-full">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
              <Select label="Label" note="Note" isDisabled className="w-full ml-3">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Select>
            </div>
          </Section>
        </Card>
        <Card title="Checkbox">
          <Section title="Checked and not checked">
            <div className="flex items-end">
              <Checkbox isChecked>This is a checkbox</Checkbox>
              <Checkbox className="ml-3">This is a checkbox</Checkbox>
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <Checkbox isDisabled>This is a checkbox</Checkbox>
              <Checkbox hasError className="ml-3">This is a checkbox</Checkbox>
              <Checkbox isIndeterminate className="ml-3">This is a checkbox</Checkbox>
            </div>
          </Section>
        </Card>
        <Card title="Radio">
          <Section title="Checked and not checked">
            <div className="flex items-end">
              <Radio isChecked>This is a radio</Radio>
              <Radio className="ml-3">This is a radio</Radio>
            </div>
          </Section>
          <Section title="States">
            <div className="flex items-end">
              <Radio isDisabled>This is a radio</Radio>
              <Radio hasError className="ml-3">This is a radio</Radio>
            </div>
          </Section>
        </Card>
        <Card title="Avatar">
        </Card>
        <Card title="Star Rating">
          <Section title="Sizes">
            <div className="flex items-end">
              <StarRating rating={0}/>
              <StarRating className="ml-3" size="medium" rating={2.5}/>
              <StarRating className="ml-3" size="large" rating={5}/>
            </div>
          </Section>
        </Card>
        <Card title="Alert">
          <Section title="Themes">
            <Alert className="mb-3" theme="success">Alert Success</Alert>
            <Alert className="mb-3" theme="info">Alert Info</Alert>
            <Alert className="mb-3" theme="warning">Alert Warning</Alert>
            <Alert theme="caution">Alert Caution</Alert>
          </Section>
        </Card>
        <Card title="Banner Alert">
          <Section title="Themes">
            <BannerAlert className="mb-3" theme="info">Banner Info</BannerAlert>
            <BannerAlert className="mb-3" theme="warning">Banner Warning</BannerAlert>
            <BannerAlert theme="caution">Banner Caution</BannerAlert>
          </Section>
        </Card>
      </div>
    </div>
  )
}
