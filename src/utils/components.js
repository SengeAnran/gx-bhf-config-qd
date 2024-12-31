import BaseDialog from '@/components/BaseDialog/index.vue'
import BaseIcon from '@/components/BaseIcon/index.vue'
import BaseButton from '@/components/BaseButton/index.vue'
import BaseBlock from '@/components/BaseBlock/index.vue'
import BaseTable from '@/components/BaseTable/index.vue'
import BaseSearch from '@/components/BaseSearch/index.vue'
import TopSearch from '@/components/TopSearch/index.vue'

import MySearch from '@/components/MySearch/index.vue'  //
import MyForm from '@/components/MyForm/index.vue'  //


// import BaseForm from '@/components/BaseForm/index.vue'



export default (Vue) => {
    Vue.component('BaseDialog', BaseDialog)
    Vue.component('BaseIcon', BaseIcon)
    Vue.component('BaseButton', BaseButton)
    Vue.component('BaseTable', BaseTable)
    Vue.component('BaseBlock', BaseBlock)
    Vue.component('BaseSearch', BaseSearch)
    // Vue.component('BaseForm', BaseForm)
    Vue.component('TopSearch', TopSearch)
    Vue.component('MySearch', MySearch)  //
    Vue.component('MyForm', MyForm)      //
}