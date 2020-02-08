import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import moment from 'moment'

import './index.scss'

moment.locale('zh-cn')

export default class Index extends Component {
  state = {
    data: {
      title: '',
      content: ''
    },
    replies: []
  }

  componentWillMount () {
    const id = this.$router.params.id
    
    Taro.showLoading({
      title: '获取主题数据中...'
    })

    Taro.request({
      url: 'https://www.v2ex.com/api/topics/show.json?id=' + id
    }).then(res=>{
      this.setState({
        data: res.data[0]
      })
    })

    Taro.showLoading({
      title: '获取评论数据中...'
    })

    Taro.request({
      url: 'https://www.v2ex.com/api/replies/show.json?topic_id=' + id
    }).then(res=>{
      this.setState({
        replies: res.data
      })
      Taro.hideLoading()
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config: Config = {
    navigationBarTitleText: '主题'
  }

  render () {
    const {data, replies} = this.state

    const repliesContent = replies.map(item=>{
      return (
        // 评论
        <View className='reply-div' key={String(item.id)}>
          <View className='reply-user-div'>
            <Image className='user-image' src={'https://' + item.member.avatar_mini}/>
            <Text className='user-name'>{ item.member.username }</Text>
            <Text className='time'>{ moment(item.created * 1000).fromNow() }</Text>
          </View>
          <View className='reply-content'>{ item.content }</View>
        </View>
      )
    })

    return (
      <View className='index'>
        <View className='topic-user-div'>
          <Image className='user-image' src={'https://' + data.member.avatar_mini}/>
          <Text className='user-name'>{ data.member.username }</Text>
          <Text className='time'>{ moment(data.created * 1000).fromNow() }</Text>          
        </View>
        <Text className='title'>{data.title}</Text>
        <Text className='content'>{data.content}</Text>
        
        {repliesContent}

        {/* <View className='footer'>
          <Text>我也是有底线的人</Text>
        </View> */}
      </View>
    )
  }
}
