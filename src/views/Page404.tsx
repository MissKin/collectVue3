import {defineComponent, ref, h} from 'vue'
import {Result, Button} from "ant-design-vue";

interface ExampleProps {
    name?: string
}

const Page404 = defineComponent<ExampleProps>(props => {

    let a: null | { [key: string]: any } = {}
    return () => (
        <Result status="404" title="404" sub-title="Sorry, the page you visited does not exist."
                v-slots={{
                    extra: () => <Button type="primary">Back Home</Button>
                }}>
        </Result>
    )
})

Page404.props = {
    name: String
}

export default Page404
