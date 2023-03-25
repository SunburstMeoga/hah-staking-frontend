import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zhcn from './zh-CN'
import enus from './en-US'

Vue.use(VueI18n);
const i18n = new VueI18n({
    // set default language
    locale: 'en-US', // language flag
    messages: {
        'zh-CN': zhcn,
        'en-US': enus
    }
})
// 暴露i18n
export default i18n;
