<template>
    <article class="article">
        <div class="search-box">
            <div class="container">
                <div class="search-form">
                    <input type="text" placeholder="请输入身份证或者函件编号" value="" />
                    <button>搜索</button>
                </div>
                <div class="search-tip">需登录后才可以查询律所所发出的短信或者电子函件</div>
            </div>
        </div>
        <div class="letters-box">
            <div class="container">
                <h2 class="">最近函件公示</h2>
                <!-- 搜索结果 -->
                <div class="search-result">
                    <table>
                        <thead>
                            <tr>
                                <th width="30"></th>
                                <th>函件编号</th>
                                <th>函件类型</th>
                                <th>姓名</th>
                                <th>身份证号码</th>
                                <th>发函时间</th>
                                <th>函件内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>NO.123445</td>
                                <td>短信</td>
                                <td>王*玛</td>
                                <td>124457********8852</td>
                                <td>2017-10-24</td>
                                <td><a href="###">验证查看</a></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>NO.123445</td>
                                <td>电子邮件</td>
                                <td>王*玛</td>
                                <td>124457********8852</td>
                                <td>2017-10-24</td>
                                <td><a href="###">验证查看</a></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>NO.123445</td>
                                <td>短信</td>
                                <td>王*玛</td>
                                <td>124457********8852</td>
                                <td>2017-10-24</td>
                                <td><a href="###">验证查看</a></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>NO.123445</td>
                                <td>电子邮件</td>
                                <td>王*玛</td>
                                <td>124457********8852</td>
                                <td>2017-10-24</td>
                                <td><a href="###">验证查看</a></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>NO.123445</td>
                                <td>短信</td>
                                <td>王*玛</td>
                                <td>124457********8852</td>
                                <td>2017-10-24</td>
                                <td><a href="###">验证查看</a></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>NO.123445</td>
                                <td>电子邮件</td>
                                <td>王*玛</td>
                                <td>124457********8852</td>
                                <td>2017-10-24</td>
                                <td><a href="###">验证查看</a></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>NO.123445</td>
                                <td>短信</td>
                                <td>王*玛</td>
                                <td>124457********8852</td>
                                <td>2017-10-24</td>
                                <td><a href="###">验证查看</a></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>NO.123445</td>
                                <td>电子邮件</td>
                                <td>王*玛</td>
                                <td>124457********8852</td>
                                <td>2017-10-24</td>
                                <td><a href="###">验证查看</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 搜索无果 -->
                <div class="search-result none hide">
                    <dl>
                        <dt><i class="box-icon"></i></dt>
                        <dd>未找到与<b class="c-red">“12566”</b>相关的函件</dd>
                    </dl>
                </div>
                <a href="###" class="more-btn">查看更多</a>
            </div>
        </div>
    </article>
</template>
<script>
import '../../style/letter.css';
export default {
    data() {
        return {}
    },
    methods: {
    },
    mounted() {
    }
}
</script>