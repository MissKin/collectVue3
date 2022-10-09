import {defineComponent, ref, h, reactive} from 'vue'
import {Button, Affix} from 'ant-design-vue'

type Props = {
    title: string
}
const msg = ref('哈喽，请微笑！')
const flag = ref<boolean>(false)
const handleClick = () => {

    flag.value = !flag.value
    console.log(flag.value)
}
const offset = reactive({
    top: 10,
    showAffix: true
})
const list = reactive<Number[]>([1,2,3])
/**
 * tsx语法
 * 1. 需要下载 @vitejs/plugin-vue-jsx  vite.config.ts引入
 * 2. 用ref定义变量 需要添加 XX.value
 * 3. tsx是支持v-show指令
 * 4.tsx不支持v-if、v-else指令，这时候需要使用到三目运算符了
 * 5. tsx不支持v-for指令，使用map方法遍历数组，map函数中返回一个标签渲染dom节点
 * 6.接收props，定义type Props，在defineComponent 的形参中设置参数类型
 * 7. 事件： 1： 不传递参数时，直接定义，需要参数则 用bind来改变this的指向 onClick={TestClick.bind(this,item)}
 */
const test = defineComponent((props:Props) => {
    return () => (
        <div>
            <p>标题：{props.title}</p>
            <Affix v-show={offset.showAffix} offsetTop={offset.top}>
                <Button onClick={() => {offset.top += 10}}>Affix top</Button>
            </Affix>
            <input v-model={msg.value} />
            <div >{flag.value ? '显示' : '隐藏'}{msg.value}</div>
            <Button onClick={handleClick}>切换</Button>
            <p>循环map:</p>
            {
                list.map((item,index) => {
                    return (
                        <div key={index} data-index={index}>{item}</div>

                    )
                })
            }
        </div>
    )
})
export default test
