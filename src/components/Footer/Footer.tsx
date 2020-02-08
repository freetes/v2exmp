import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './footer.scss'

export default class Footer extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='footer'>
        <Text>我也是有底线的人</Text>
      </View>
    )
  }
}
