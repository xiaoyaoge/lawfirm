import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/main/Main.vue'
import News from './views/main/News.vue'
import NewsDetail from './views/main/NewsDetail.vue'
import Lawyer from './views/main/Lawyer.vue'
import LawyerDetail from './views/main/LawyerDetail.vue'
import Search from './views/main/LetterSearch.vue'
import About from './views/main/About.vue'


let routes = [
    {
        path: '/404',
        component: NotFound,
        name: '',
        role: 0,
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '仁良律所',
        iconCls: 'icon-id',
        hidden: false,
        leaf: false, //只有一个节点
        paths: '/',
        navmuen: true,// true: 为主导航     false: 为其他页面
        children: [
            { path: '/main', component: Main, name: '首页' },
            { path: '/news', component: News, name: '仁良新闻' },
            { path: '/news/:id', component: NewsDetail, name: '新闻详情',hidden: true },
            { path: '/lawyer', component: Lawyer, name: '专业律师' },
            { path: '/lawyer/:id', component: LawyerDetail, name: '律师详情',hidden: true },
            { path: '/search', component: Search, name: '函件查询' },
            { path: '/about', component: About, name: '关于我们' }
        ]
    },
    {
        path: '*',
        hidden: true,
        role: 0,
        redirect: { path: '/404' }
    }
];


export default routes;