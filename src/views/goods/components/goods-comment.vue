<template>
  <div class="goods-comment">
    <!-- 评价头部 -->
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            @click="changeTag(tag, i)"
            :class="{ active: tagIndex === i }"
            href="javascript:;"
            v-for="(tag, i) in commentInfo.tags"
            :key="tag.title"
          >
            {{ tag.title }}（{{ tag.tagCount }}）
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        :class="{ active: reqParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
        >默认</a
      >
      <a
        :class="{ active: reqParams.sortField === 'createTime' }"
        @click="changeSort('createTime')"
        href="javascript:;"
        >最新</a
      >
      <a
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        @click="changeSort('praiseCount')"
        href="javascript:;"
        >最热</a
      >
    </div>
    <!-- 评价列表 -->
    <div class="list">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ anonymous(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i" class="iconfont icon-wjx01"></i>
            <i
              v-for="i in 5 - item.score"
              :key="i"
              class="iconfont icon-wjx02"
            ></i>
            <span class="attr">{{ attrsText(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">{{ item.content }}</div>
          <!-- 评论图组件 -->
          <GoodsCommentImage :images="item.pictures" />
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 评价分页 -->
    <XtxPagination
      v-if="total > 0"
      @current-change="changePager"
      :total="total"
      :page-size="reqParams.pageSize"
      :current-page="reqParams.page"
    />
  </div>
</template>
<script>
import { findGoodsCommentInfo, findGoodsCommentList } from '@/api/goods'
import { inject, reactive, ref, watch } from 'vue'
import GoodsCommentImage from './goods-comment-image'
export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  setup () {
    const goods = inject('goods')
    const commentInfo = ref(null)
    findGoodsCommentInfo(goods.value.id).then(({ result }) => {
      // 把全部评价，有图评价，追加到tags的前面
      result.tags.unshift({ title: '有图', tagCount: result.hasPictureCount })
      result.tags.unshift({ title: '全部评价', tagCount: result.evaluateCount })
      commentInfo.value = result
    })
    // 默认选中的tag
    const tagIndex = ref(0)
    const changeTag = (tag, i) => {
      tagIndex.value = i
      // 设置查询参数 hasPicture tag
      if (i === 0) {
        // 全部评论
        reqParams.hasPicture = false
        reqParams.tag = null
      } else if (i === 1) {
        // 有图
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = false
        reqParams.tag = tag.title
      }
      reqParams.page = 1
    }
    // 查询参数
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: false,
      tag: null,
      sortField: null,
      sortMethod: 'desc'
    })
    // 点击排序
    const changeSort = (type) => {
      reqParams.sortField = type
      reqParams.page = 1
    }

    // 当查询条件发生变化，需要主动触发
    // reactive的数据也可以直接监听
    const commentList = ref([])
    const total = ref(0)
    watch(reqParams, () => {
      findGoodsCommentList(goods.id, reqParams).then(({ result }) => {
        commentList.value = result.items
        total.value = result.counts
      })
    }, { immediate: true })

    // 显示属性规格
    const attrsText = (specs) => {
      return specs.reduce((p, c) => (p += `${c.name}：${c.nameValue} `), '').trim()
    }
    // 处理名称加上****
    const anonymous = (name) => {
      return name.substr(0, 1) + '****' + name.substr(-1)
    }

    // 改变分页
    const changePager = (np) => {
      reqParams.page = np
    }

    return { changePager, total, commentInfo, tagIndex, changeTag, reqParams, changeSort, commentList, attrsText, anonymous }
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
// 列表
.list {
  padding: 0 20px;
  .item {
    display: flex;
    padding: 25px 10px;
    border-bottom: 1px solid #f5f5f5;
    .user {
      width: 160px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        padding-left: 10px;
        color: #666;
      }
    }
    .body {
      flex: 1;
      .score {
        line-height: 40px;
        .iconfont {
          color: #ff9240;
          padding-right: 3px;
        }
        .attr {
          padding-left: 10px;
          color: #666;
        }
      }
    }
    .text {
      color: #666;
      line-height: 24px;
    }
    .time {
      color: #999;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
  }
}
</style>
