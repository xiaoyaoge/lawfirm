<template>
    <div>
        <div class="header">
            <div class="fn-clear container">
                <a href="/" class="logo">
                    <img src="../style/img/logo.png" width="201" height="48" align="middle" alt="">
                </a>
                <div class="top-nav">
                    <template v-for="(item,index) in $router.options.routes" v-if="item.navmuen">
                        <a v-for="child in item.children" @click="$router.push(child.path);" :class="(child.path.indexOf($route.path.split('/')[1]))>-1?'active':''" v-if="!child.hidden">{{child.name}}</a>
                    </template>
                </div>
                <div class="fn-right top-right-info">
                    <div class="tel-info fn-left">
                        <i class="icon tel"></i>
                        <span>021-51801000</span>
                        <span class="line"></span>
                    </div>
                    <div v-if="loginType==''" class="login-wrap fn-right">
                        <a @click="loginShow()">登录</a>
                        <a @click="registerShow('register')">注册</a>
                    </div>
                    <div v-else class="login-wrap fn-right">
                        <span><i class="icon user"></i>{{loginType}}</span>
                        <a @click="logout">退出登录</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="article">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <div class="footer">
            <div class="container">
                <div class="fn-clear">
                    <div class="fn-left">
                        <ul class="foot-sort clear">
                            <li>
                                <dl>
                                    <dt>关于我们</dt>
                                    <dd>
                                        <a href="###" target="_blank">概览</a>
                                        <a href="###" target="_blank">工作地点</a>
                                        <a href="###" target="_blank">团队介绍</a>
                                        <a href="###" target="_blank">团队法律声明介绍</a>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>友情链接</dt>
                                    <dd>
                                        <a href="http://www.fafashe.com" target="_blank">法法社</a>
                                        <a href="http://www.fenqile.com" target="_blank">分期乐</a>
                                        <a href="http://www.twoeyes.cn" target="_blank">目目学院</a>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>最近新闻</dt>
                                    <dd>
                                        <a href="#/news">仁良业绩</a>
                                        <a href="#/news">业内资讯</a>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div class="fn-right">
                        <img src="../style/img/qr.png" width="148" height="148">
                    </div>
                </div>
            </div>
            <div class="copyright">
                © Renliang 2016 京ICP备06002628号-1
            </div>
        </div>
        <!-- 登录弹窗 -->
        <div class="layer" v-show="loginHieden">
            <div class="common-modal">
                <i class="icon close" @click="loginHieden=false;"></i>
                <h3 class="modal-title"><i class="firm-icon"></i>登录仁良</h3>
                <div class="modal-content">
                    <form class="modal-form">
                        <div class="form-item">
                            <div class="input-item">
                                <i class="icon user"></i>
                                <input type="text" v-model="form.mobile" placeholder="请输入注册的手机账号" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="input-item">
                                <i class="icon pwd"></i>
                                <input type="password" v-model="form.password" placeholder="密码" />
                            </div>
                        </div>
                        <!-- 验证滑块 -->
                        <div class="verify-item" id="dragbox">
                            <span>按住滑块，拖至最右侧</span>
                            <!-- 最小宽度15%,拖拽宽度从15%开始加,并且在process-bar加class="ing" -->
                            <!-- 完成在process-bar加上class="finished",width为100%,并且将文案改为验证通过 -->
                            <div class="process-bar" id="processTag" style="width: 48px;">
                                <span class="process-tag" id="dragbtn"></span>
                                <span class="process-text" id="processText">按住滑块，拖至最右侧</span>
                            </div>
                        </div>
                        <!-- /验证滑块 -->
                        <!-- <div class="verify-item" id="dragbox">
                            <span>按住滑块，拖至最右侧</span>
                            <div class="process-tag" id="dragbtn" style="left: 0;"></div>
                        </div> -->
                        <div class="form-link-wrap fn-clear">
                            <a class="fn-right" @click="registerShow('setpwd')">忘记密码？</a>
                        </div>
                        <a class="modal-btn" @click="login()">登录</a>
                    </form>
                </div>
                <div class="modal-bottom">
                    <div class="bottom-text text-center">还没有账号?<a @click="registerShow('register');loginHieden=false">马上注册</a></div>
                </div>
            </div>
        </div>
        <!-- 注册/修改密码弹窗 -->
        <div class="layer" v-show="registerHieden">
            <div class="common-modal">
                <i class="icon close" @click="registerHieden=false;"></i>
                <h3 class="modal-title"><i class="firm-icon"></i>{{registerType=="register"?'注册仁良':'找回密码'}}</h3>
                <div class="modal-content">
                    <!-- 表单提交错误提示 -->
                    <div v-show="msgError!==''" class="warn-tip">
                        <i class="icon warn"></i>
                        <span>{{msgError}}</span>
                    </div>
                    <div class="modal-form">
                        <!-- 报错提示在form-item加上error就可以了 -->
                        <div class="form-item" :class="vMobile('mobile',false)?'':'error'">
                            <div class="input-item">
                                <i class="icon user"></i>
                                <input type="text" v-model="registerForm.mobile" maxlength="11" placeholder="请输入你的手机号码" />
                                <a class="sms-btn" @click="getCode(registerForm.mobile)">发送验证码</a>
                            </div>
                            <p class="error-tip">请输入正确的手机格式</p>
                        </div>
                        <!-- 正确提示在form-item加上correct就可以了 -->
                        <div class="form-item" :class="vPassword('password',false)?'':'error'">
                            <div class="input-item">
                                <i class="icon pwd"></i>
                                <input type="password" v-model="registerForm.password" placeholder="密码长度6-20位" maxlength="20" />
                            </div>
                            <p class="error-tip">密码长度6-20位</p>
                        </div>
                        <div class="form-item" :class="vPasswordS('password1',false)?'':'error'">
                            <div class="input-item">
                                <i class="icon pwd"></i>
                                <input type="password" v-model="registerForm.password1" placeholder="请再次输入你的密码" maxlength="20" />
                            </div>
                            <p class="error-tip">两次输入的密码不匹配，请重新输入</p>
                        </div>
                        <div class="form-item" :class="vVerifyCode('verifyCode',false)?'':'error'">
                            <div class="input-item">
                                <i class="icon code"></i>
                                <input type="text" v-model="registerForm.verifyCode" placeholder="请输入你的验证码" />
                            </div>
                            <p class="error-tip">请输入正确的验证码</p>
                        </div>
                        <div class="form-tip-wrap">
                            <p v-if="registerType=='register'">点击[注册]，即代表你同意
                                <a @click="agreeHieden=true">《仁良注册协议》</a>
                            </p>
                        </div>
                        <a class="modal-btn" @click="register(registerType)">{{register==register?'注册':'确定'}}</a>
                    </div>
                </div>
                <div class="modal-bottom">
                    <div class="operate-content">
                        <a @click="registerHieden=false;loginHieden=true;"><i class="icon back"></i>返回登录</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 注册协议 -->
        <div class="layer" v-show="agreeHieden">
            <div class="protocol-modal">
                <i class="icon close" @click="agreeHieden=false"></i>
                <h3 class="modal-title">注册协议</h3>
                <div class="modal-text">
                    <p>本网站由上海仁良律师事务所所有和运营。请您在使用本网站的服务之前仔细阅读如下条款（未成年人或者其他无民事行为能力、限制民事行为能力的人请在监护人的陪同下阅读），这些条款在您与本网站之间具有合同效力。</p>
                    <p>请您务必认真阅读全部条款内容，如您有任何疑问，可向本网站咨询。</p>
                    <p>只要您成为本网站注册用户或者使用了本网站的服务，即视为您同意并签署了本协议，本协议条款对您及仁良律所均具有法律约束力。 </p>鉴于本网站的功能只对注册用户开放、本网站的信息也只向注册用户提供（非注册用户只能看到经过隐藏处理的信息），您使用本网站的功能或者在本网站查看、下载信息的行为均视为已经注册并且使用了本网站的服务。</p>
                    <p> 如果您要使用本网站的服务，您应当认真阅读并完全同意：</p>
                    <p>（1） 本网站的所有法律公告；和</p>
                    <p>（2） 本网站的上传资料协议；和</p>
                    <p>（3） 本协议项下的全部条款并按照页面上的提示完成全部的注册程序。 </p>
                    <h4>1、 定义 </h4>
                    <p>1.1 用户名：指您通过注册用以登录本网站符号，亦称为“账号”。 </p>
                    <p>1.2 服务：指仁良律所和/或其运营单位依照相关法律法规的规定通过互联网和/或其他方式向您提供的服务。 </p>
                    <h4>2、 用户名的注册与保管</h4>
                    <p> 2.1 您申请注册成为本网站会员时，请向本网站提供真实且准确的个人资料，并于个人资料发生任何变动时及时更新。您在注册过程中输入的姓名和证件号码将作为识别您与用户名的一致性的首要证明资料。在您无法有效证明身份时，本网站有权拒绝向您提供任何服务或承担任何义务。</p>
                    <p>2.2 您注册的用户名应当遵守以下规则：</p>
                    <p>2.2.1 不得冒充以党和国家领导人或其他社会名人的真实姓名、字号、艺名、笔名注册；</p>
                    <p>2.2.2 不得以国家机构或其他机构的名称或其简称注册；</p>
                    <p>2.2.3 不得注册不文明、不健康名字，或包含歧视、侮辱、猥亵类词语的名字；</p>
                    <p>2.2.4 不得注册易产生歧义、引起他人误解的名字。</p>
                    <p>2.3 您注册成功后，即成为本网站的会员。您注册时登记的用户名和密码是您会员身份的唯一有效识别。您理解，本网站和/或其运营单位无义务并且不可能对非法使用或者未经您授权使用您帐号及密码的行为作出甄别，因此，您有义务对您的用户名和密码进行妥善保管，您应对任何人利用您的密码及帐号所进行的活动负完全的责任。如果您发现您的用户名受到他人非法使用时，应当立即通知本网站和/或其运营单位。由于您疏于保管或黑客行为等原因造成的用户名、密码丢失及相应的损失均由您自行承担。</p>
                    <p>2.4 如果您注册的用户名出现下列任何情况之一，本网站有权在不事先通知您的情况下拒绝您的注册和/或冻结、删除该账号并暂停和/或终止为您提供相关的服务：</p>
                    <p>2.4.1 您注册的用户名违反了任何上述规则；</p>
                    <p>2.4.2 您注册的用户名任何连续90自然日内未登陆本网站;</p>
                    <p>2.4.3 仁良律所发现或者有理由怀疑使用您的用户名的使用者并非帐号初始注册人；</p>
                    <p>2.4.4仁良律所发现或者有理由怀疑您提供的个人资料不真实、不准确或者过时而未更新；</p>
                    <p>2.4.5您注册的用户名在登录后出现操作范围、频度、阅读和/或下载的数量等达到本网站规定的限制条件；</p>
                    <p>2.4.6 您或者您注册的用户名出现其他违反本网站规定或者可能损害本网站和/或其运用单位和/或相关用户合法权益的行为。</p>
                    <p>2.5 您应当对以您的用户名在本网站发生或者与本网站相关的所有活动和事件承担全部法律责任。</p>
                    <p>2.6 您知悉并同意注册成为仁良律所用户即代表您同时同意注册成为仁良律所合作企业法法社（深圳）网络科技有限公司所有并运营的平台“法法社”（网址：www.fafashe.com）用户。</p>
                    <h4>3、服务条款</h4>
                    <p>3.1 服务</p>
                    <p>3.1.1 仁良律所和/或其运营单位有权根据实际情况决定及调整提供网络和/或其他服务的内容，并对其所提供之服务拥有最终解释权。</p>
                    <p>3.1.2 您理解，仁良律所和/或其运营单位仅提供相关的网络和/或其他服务，与相关网络服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均应由您自行负担。</p>
                    <p> 3.1.3 仁良律所提供的部分网络服务为收费的网络服务，您应当为使用该服务向仁良律所和/或其运营单位支付一定的费用。对于收费的网络服务，仁良律所和/或其运营单位会在您使用之前给予您明确的提示或者与您另行签订合同，只有您根据合同或提示确认并支付相关费用后方有权使用该等收费网络服务。在您全额支付相关费用之前，仁良律所和/或其运营单位有权拒绝向您提供该等收费网络服务。</p>
                    <p> 3.1.4 您无争议的同意，仁良律所和/或其运营单位有权随时变更、中断或终止部分或全部的网络服务（包括收费网络服务），且无义务通知您，亦无义务对任何您或任何第三方承担任何责任；仁良律所和/或其运营单位就此所承担的全部义务仅为就您已经支付的服务费，按照您实际使用服务的情况扣除相应服务费之后将剩余的服务费退还给您。</p>
                    <p>3.1.5您理解，仁良律所和/或其运营单位需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护。如因此类情况而造成网络服务在合理时间内的中断，仁良律所和/或其运营单位无需为此承担任何责任。仁良律所和/或其运营单位将在条件允许的情况下，尽可能事先以适当的方式进行通知，但前述通知并非仁良律所和/或其运营单位必须履行的义务。</p>
                    <p>3.1.6您有权依照本网站规定的程序和要求使用仁良律所和/或其运营单位提供的各项服务。如果您对仁良律所和/或其运营单位提供的某项服务有异议，可以依照本网站提供的联系方式与本网站取得联系以便得到及时解决。</p>
                    <p>3.2 使用规则</p>
                    <p> 3.2.1 您在使用仁良律所和/或其运营单位提供的网络和/或其他服务的过程中，必须遵循以下规则： </p>
                    <p>（1） 遵守中国有关的法律、法规和规范性文件；</p>
                    <p>（2） 遵守所有与网络服务有关的网络协议、规定和程序；</p>
                    <p>（3） 不得为任何非法目的而使用网络服务系统；</p>
                    <p>（4） 不得利用仁良律所和/或其运营单位提供的网络和/或其他服务进行任何可能对互联网或移动网正常运转造成不利影响的任何行为；</p>
                    <p>（5） 不得利用本网站提供的网络服务上传、展示或传播任何非法的、虚假的、违反社会公德的信息资料；</p>
                    <p>（6） 不得从事任何侵犯其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益的行为；</p>
                    <p>（7） 不得利用仁良律所和/或其运营单位提供的网络和/或其他服务进行任何不利于仁良律所和/或其运营单位或者危害计算机信息网络安全的行为；</p>
                    <p>（8） 如发现任何非法使用用户名或用户名出现安全漏洞的情况，应立即通知仁良律所和/或其运营单位。</p>
                    <p>3.2.2 您无争议的同意，针对仁良律所和/或其运营单位提供的网络和/或其他服务，仁良律所和/或其运营单位有权随时通过各种方式（包括但不限于网页公告、电子邮件、短信提醒等）做出任何相关的声明、通知、警示。该等声明、通知、警示的内容视为本协议的一部分，如您在联想做出该等声明、通知、警示后使用该等网络服务，视为您完全同意该等声明、通知、警示的内容。</p>
                    <p>3.2.3 在下列情形下，仁良律所和/或其运营单位有权随时中断或终止向您提供本协议项下的网络服务（包括收费的网络服务）而无需对您或任何第三方承担任何责任：</p>
                    <p>（1） 您提供的个人资料不真实；或</p>
                    <p>（2） 您违反本协议和/或仁良律所的其他规定。在此等情形下，仁良律所和/或其运营单位亦有权要求您改正或自行更改/删除您发布的全部或部分信息资料。</p>
                    <p>3.2.4 鉴于网络的不可预见性，您理解并明确同意您使用仁良律所提供的网络服务所存在的风险及由此产生的一切后果均完全由您自行承担，无论仁良律所和/或其运营单位是否就该等风险事先告知您，仁良律所和/或其运营单位无须就此对您承担任何责任。</p>
                    <p>3.2.5 仁良律所和/或其运营单位不就下述事项向您做任何形式的担保或保证：</p>
                    <p>（1） 网络服务一定能满足您的要求；</p>
                    <p>（2） 网络服务的持续畅通，不中断；</p>
                    <p>（3） 网络服务的及时性、安全性、准确性。</p>
                    <h4>4、 知识产权和相关权益保护</h4>
                    <p>4.1 仁良律所和/或其运营单位提供的网络和/或其他服务中，包括文本、网页、标记、图片、图形、图表、链接、软件、音频和/或视频资料等均受著作权、商标和/或其它财产所有权法律的保护。</p>
                    <p> 4.2 您只有获得相关权利人同意之后，才能依照相关权利人授权的范围使用上述资料。</p>
                    <p> 4.3未经仁良律所和/或其运营单位的书面许可，任何人不得利用电子或者机械形式，拷贝、复印、下载、编辑、汇编、出版、复制、发布、传播、修改、翻译、再创造本网站提供的包括且不限于文本、网页、标记、图片、图形、图表、链接、软件、音频和/或视频资料在内的任何部分或者全部信息资料，亦不得将上述资料用于其他任何商业目的。本网站的任何信息不得连接或传送，或存储于其他信息检索系统中。未经书面许可，亦不得以“友情链接”方式将本网站所提供的任何信息载入任何其他服务器上。如您违反该条协议，不当使用本网站所提供的信息资料，本网站有权终止向您提供任何服务、终止您的注册身份并保留向您追究法律责任的权利。 </p>
                    <p> 4.4 您保证您通过本网站上传和发布的内容不存在知识产权争议，并保证相关内容的完整、准确性和不侵害他人合法权益，保证上传的文件和内容在法律上是允许披露和公开的，并且对违反上述保证事项承担全部法律责任。若因您通过本网站上传或发布的内容侵犯第三方的权利而引起第三方对仁良律所和/或其运营单位的索赔、交涉、诉讼，您应为仁良律所和/或其运营单位抗辩，或在仁良律所和/或其运营单位的要求下合作抗辩，保证仁良律所和/或其运营单位的利益不受损害，您应承担因此而产生的所有赔偿、罚款、律师费和损害赔偿等。</p>
                    <p>4.5 仁良律所和/或其运营单位有权利将您上传的文件及其内容收录到其数据库，并且提供给相关单位和个人使用。</p>
                    <h4>5、 违约或者侵权赔偿</h4>
                    <p>您有义务保障和维护仁良律所和/或其运营单位及其他用户和或涉及到的非用户的合法权益。如因您违反有关法律、法规、规范性文件的规定或本协议项下的任何条款而给仁良律所和/或其运营单位或任何其他第三人造成损失，您同意承担由此造成的全部损害赔偿责任。</p>
                    <h4>6、 不可抗力</h4>
                    <p>6.1 “不可抗力”是指本协议双方不能预见、不能避免并且不能克服的客观情况，其情形包括：火灾、地震、洪水、战争、罢工、网络堵塞或瘫痪、病毒、黑客攻击、政府或者法院等机构的禁令等。</p>
                    <p>6.2 遭受不可抗力事件的一方可暂行中止履行本协议项下的义务直至不可抗力事件的影响消除为止，并且无需为此而承担违约责任；但应尽最大努力克服该等事件，减轻其负面的影响。</p>
                    <h4>7、 隐私条款</h4>
                    <p>7.1 如果您在注册时向仁良律所提供了相关个人信息，如真实姓名，联络方式，相关证件编号等，仁良律所郑重承诺将在提供服务时保护会员的个人信息。</p>
                    <p>7.2 您提供的信息将受到严格保密，并用于促进您与仁良律所之间的会员关系。我们将以下列方式使用您的个人信息： </p>
                    <p>（1）会员身份和登录密码。使您能够访问您的个人信息并享受信息服务。 </p>
                    <p>（2）账户信息。这些信息可以告诉我们：您的身份、如何与您联系、您的计费信息等等。 </p>
                    <p>（3）电子邮件通信。用于提出和响应各种问题和请求。</p>
                    <p>（4）仁良律所积极参与社会信用体系建设，您提交的各种信息可用于汇法用户的征信查询、风险控制、欠款催收、失联查找等用途。 我们有权自己使用也可授权他人使用您提交的新。</p>
                    除司法机关或其他有权机关按照法定程序要求提交个人资料外，未经您的书面同意，仁良律所不会改变对您的个人信息的使用方式。 </p>
                    <p> 7.3 通过我们的网站可访问其它网站。但是，请会员务必注意，由于我们无法控制那些网站，您必须自行负责对密码或任何帐户信息进行保密。无论何时处于联机状态，均应小心谨慎。 </p>
                    <p> 7.4 您有权进入仁良律所查询个人信息，以便资料不正确后可以改正、修改或删除。 </p>
                    您可以随时通知仁良律所有关您任何信息的变化，如名称、地址、职业、电话号码或电子邮件地址的变更，以帮助仁良律所确保您个人信息的准确性。</p>
                    <h4>8、 一般条款</h4>
                    <p>8.1 法律信息声明</p>
                    <p> 8.1.1本网站会尽一切努力使您得到所需的法律信息，但本网站仅为用户查询相关法律信息资料提供内容上的参考，如需正式引用，请核对官方正式文本。如使用本网站提供的信息影响到您所进行的法律事务，致使其出现了您预期以外的困难或结果，本网站不承担任何责任。访问本网站查看并下载或以其他形式获取本网站的任何材料，与此有关的风险由用户自行承担，对于因下载任何材料而发生电脑系统的任何损毁或数据损失，自行承担责任。
                        <p> 8.1.2仁良律所法律信息资料库所提供的任何法律文件资料，旨在方便会员查询使用，为提高查询效率甚至进行了一定程度的编排。如欲将其作为具有法律效力的资料来源而直接引用，应注意与政府主管机关发布的正式文件或者人民法院制作的司法文书进行核对。</p>
                        <p>8.1.3仁良律所提供的所有案例文本、法学论文或其他法律信息，属客观如实反映，均不表明本网站对其持赞同或反对的立场，任何使用者应自行判断所浏览信息的价值。</p>
                        <p> 8.2 协议修改</p>
                        <p>8.2.1 您同意，仁良律所和/或其运营单位有权随时修改本协议的任何条款而无需另行通知您，修改后的条款一旦在本网站公布即成为双方协议的内容。您应经常访问本页面以了解当前的条款。</p>
                        <p>8.2.2 如您不同意仁良律所和/或其运营单位对本协议相关条款所做的修改，应当立即停止使用仁良律所和/或其运营单位提供的网络和/或其他服务。如果您在仁良律所和/或其运营单位对本协议相关条款做出修改后继续使用仁良律所和/或其运营单位提供的网络和/或其他服务，则视为您完全接受仁良律所和/或其运营单位对本协议相关条款所做的全部修改，双方之间无论何时发生争议均以最新的协议条款为准。</p>
                        <p>8.3 通讯</p>
                        <p> 8.3.1 您同意，本协议的签署及仁良律所和/或其运营单位根据本协议向您提供的通知、披露等均可以电子方式进行。本协议项下仁良律所和/或其运营单位通过网页公告、电子邮件、手机短信或常规的信件传送等方式向您发出的通知自仁良律所和/或其运营单位发送之日视为已送达。</p>
                        <p>8.3.2 您对于仁良律所和/或其运营单位的通知应当通过仁良律所和/或其运营单位对外正式公布的通信地址、传真号码、电子邮件地址等联系信息向仁良律所和/或其运营单位进行书面送达。</p>
                        <h4>9、 其他约定</h4>
                        <p> 9.1 本协议中的标题仅为方便而设，在解释本协议时应被忽略。</p>
                        <p>9.2 本网站的法律公告、隐私条款、上传资料协议和其他公告、声明均为本协议的组成部分。</p>
                        <p>9.3本网站不对您在本网站服务中相关数据的删除或储存失败负责。由于本网站并不控制友情链接的网站和资源，所以不对所链接的网站或资源承担责任，且不认可从外在网站或资源获取的任何内容、宣传、产品、服务或其他材料。</p>
                        <p>9.4为了改善用户体验，并保证服务的安全性和功能的一致性，本网站有权不经向您特别通知而对网站进行更新，或者对网站的部分功能效果进行改变或限制。</p>
                        <p>9.5您使用本网站服务即视为您已阅读并同意受本协议的约束。我们有权在必要时修改本协议条款。您可以在相关页面中查阅最新的协议条款。本协议条款变更后，如果您继续使用本服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用本网站服务。</p>
                        <p> 9.6本协议签订地为上海市。
                            <p>9.7本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国法律。</p>
                            <p>9.8若您和本网站之间发生任何纠纷或争议，无论是基于侵权还是基于违约，首先应友好协商解决；协商不成的，有关纠纷或争议提交上海市仲裁委员会仲裁裁决。</p>
                            <p>9.9本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。</p>
                            <p>9.10如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款及该条款的其他部分仍应有效并且有约束力。</p>
                </div>
                <div class="modal-content">
                    <a class="modal-btn" @click="agreeHieden=false">我已阅读</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../style/global.css';
import validate from '../validate'
import md5 from 'js-md5'
export default {
    data() {
        return {
            loginType: '',
            loginHieden: false,
            registerHieden: false,
            registerType: 'register',
            agreeHieden: false,
            verifyCode: false,
            searchKeyWord: '',
            form: {
                mobile: '',
                password: ''

            },
            registerForm: {
                mobile: '',
                password: '',
                password1: '',
                verifyCode: ''
            },
            inputMobile: false,
            msgError: '',
            animation: '',
            //paddingTop: `paddingTop: ${(window.innerHeight - 440) / 2}px`,
            types: ['zoom', 'fade', 'flip', 'door', 'rotate', 'slideUp', 'slideDown', 'slideLeft', 'slideRight']
        }
    },
    methods: {
        switchForm(val, type) {
            let isOk = true;
            let text = '';
            switch (val) {
                case 'mobile':
                    if (!validate.checkPhoneNum(this.registerForm.mobile)) {
                        isOk = false;
                        text = '手机号码不正确或不能为空';
                    }
                    break;
                case 'newPassword':
                    if (!validate.checkPhoneNum(this.registerForm.password)) {
                        isOk = false;
                        text = '密码不正确或不能为空（密码长度6-20位';
                    }
                    break;
                case 'password':
                    if (!validate.checkPassword(this.registerForm.password)) {
                        isOk = false;
                        text = '密码不正确或不能为空（密码长度6-20位）';
                    }
                    break;
                case 'password1':
                    if (this.registerForm.password !== this.registerForm.password1) {
                        isOk = false;
                        text = '两次输入的密码不匹配，请重新输入';
                    }
                    break;
                case 'verifyCode':
                    if (!validate.checCode(this.registerForm.verifyCode)) {
                        isOk = false;
                        text = "请输入正确的验证码";
                    }
                    break;
            }
            if (type) {
                return { isOk: isOk, text: text }
            } else {
                return isOk;
            }
        },
        vMobile(val, type) {
            let flag = false;
            if (this.registerForm.mobile) {
                flag = this.switchForm(val, type);
            } else {
                flag = true;
            }
            return flag;
        },
        vPassword(val, type) {
            let flag = false;
            if (this.registerForm.password) {
                flag = this.switchForm(val, type);
            } else {
                flag = true;
            }
            return flag;
        },
        vPasswordS(val, type) {
            let flag = false;
            if (this.registerForm.password1) {
                flag = this.switchForm(val, type);
            } else {
                flag = true;
            }
            return flag;
        },
        vVerifyCode(val, type) {
            let flag = false;
            if (this.registerForm.verifyCode) {
                flag = this.switchForm(val, type);
            } else {
                flag = true;
            }
            return flag;
        },
        getCode(mobile) {
            let params = {
                mobile: this.registerForm.mobile,
                scene: 1
            };
            if (this.registerType == 'register') {
                params.scene = 1;
            } else if (this.registerType == 'setpwd') {
                params.scene = 2;
            } else {
                params.scene = 3;
            }
            this.$http.ajaxPost({
                url: 'member/sendVerifyCode',
                params: params //scene： 1/注册 ，2/找回密码 ，3/登录
            }, (res) => {
                this.$http.aop(res, () => {
                    this.$message({
                        message: '验证码发送成功',
                        type: 'success'
                    });
                });
            });
        },
        checkLoginForm(data) {
            let isOk = true;
            let text = '';
            let type = true;
            Object.keys(data).forEach((val) => {
                if (isOk) {
                    switch (val) {
                        case 'mobile':
                            if (!validate.checkPhoneNum(this.form.mobile)) {
                                isOk = false;
                                text = '手机号码不正确或不能为空';
                            }
                            break;
                        case 'password':
                            if (this.form.password === '') {
                                isOk = false;
                                text = '密码不能为空';
                            }
                            break;
                        default:
                            break;
                    }
                }
            });

            if (!isOk) {
                this.$message.error(text);
                return false;
            }
            return true;
        },
        login() {
            if (this.checkLoginForm(this.form)) {
                if (!this.verifyCode) {
                    this.$message({
                        message: '请滑动验证码 ！',
                        type: 'warning'
                    });
                    alert(this.verifyCode);
                    return;
                }
                this.$http.ajaxPost({
                    url: 'member/login',
                    params: { mobile: this.form.mobile, password: md5(this.form.password) }
                }, (res) => {
                    this.$http.aop(res, () => {
                        this.loginType = this.form.mobile;
                        sessionStorage.setItem('user', JSON.stringify({ uid: res.body.data, mobile: this.form.mobile }));
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        });
                        this.loginHieden = false;
                    });
                });
            }
        },
        checkForm(data) {
            let isOk = true;
            let text = '';
            let type = true;
            Object.keys(data).forEach((val) => {
                switch (isOk) {
                    case true:
                        let obj = this.switchForm(val, type);
                        isOk = obj.isOk;
                        text = obj.text;
                        break;
                    default:
                        break;
                }
            });

            if (!isOk) {
                this.msgError = text;
                return false;
            }
            return true;
        },
        register(type) {
            let params = {
                mobile: this.registerForm.mobile,
                verifyCode: this.registerForm.verifyCode
            };
            if (type == 'register') {
                params.password = md5(this.registerForm.password);
            } else {
                params.newPassword = md5(this.registerForm.password);
            }
            if (this.checkForm(this.registerForm)) {
                this.$http.ajaxPost({
                    url: 'member/register',
                    params: params
                }, (res) => {
                    this.$http.aop(res, () => {
                        this.msgError = '';
                        this.$message({
                            message: '注册成功',
                            type: 'success'
                        });
                        this.registerHieden = false;
                        this.loginHieden = true;
                    });
                });
            }
        },
        loginShow() {
            this.loginHieden = true;
        },
        registerShow(type) {
            if (type == 'register') {
                this.registerType = 'register';
            } else {
                this.registerType = 'setpwd';
            }
            this.registerHieden = true;
            this.loginHieden = false;

        },
        logout() {
            this.$http.ajaxPost({
                url: 'member/logout',
                params: {}
            }, (res) => {
                this.$http.aop(res, () => {
                    sessionStorage.removeItem('user');
                    this.loginType = '';
                    this.$router.push({
                        path: '/main'
                    });

                });

            });
        },
        drag() {
            let leftWidth = 0;
            let _this = this;
            var oDiv = document.getElementById('dragbtn'); // 滑块
            var oDiv2 = document.getElementById('dragbox'); // 盒子
            var processTag = document.getElementById('processTag'); //状态
            var processText = document.getElementById('processText'); //文字

            var disX = 0;
            var disY = 0;
            oDiv.onmousedown = function(ev) {
                var oEvent = ev || event;
                disX = oEvent.clientX - oDiv.offsetLeft;
                disY = oEvent.clientY - oDiv.offsetTop;
                if (leftWidth < 240) {
                    oDiv.style.cursor = 'move';
                    document.onmousemove = function(ev) {
                        var oEvent = ev || event;
                        var l = oEvent.clientX - disX;
                        //var t = oEvent.clientY - disY;
                        if (l < 38) {
                            processTag.className = 'process-bar';
                            l = 0;
                        } else if (l > oDiv2.offsetWidth - oDiv.offsetWidth) {
                            l = oDiv2.offsetWidth - oDiv.offsetWidth;
                        }
                        if (l > 240) {
                            l = 270;
                        }
                        processTag.className = 'process-bar ing';
                        //t = 0;
                        // if (t < 50) {
                        //     t = 0;
                        // } else if (t > oDiv2.offsetHeight - oDiv.offsetHeight) {
                        //     t = oDiv2.offsetHeight - oDiv.offsetHeight;
                        // }
                        oDiv.style.left = l + 'px';
                        //oDiv.style.top = t + 'px';
                        processTag.style.width = (l + oDiv.offsetWidth) + 'px';
                        if (l === 270) {
                            _this.verifyCode = true;
                            processTag.className = 'process-bar finished';
                            leftWidth = l;
                            processText.innerHTML = '验证通过';
                            return;
                        } else {
                            _this.verifyCode = false;
                        }
                    };
                }
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    if (leftWidth < 240) {
                        oDiv.style.left = leftWidth + 'px';
                        processTag.style.width = (leftWidth + oDiv.offsetWidth) + 'px';
                    }
                    oDiv.style.cursor = 'default';
                };
                return false;
            };
        }
    },
    mounted() {
        this.drag();
        let user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            this.loginType = user.mobile || '';
        }
        //console.log(this.loginType);
        //console.log(this.$router.options.routes);
    }
}
</script>
<style>
</style>