import { shallowMount } from '@vue/test-utils'
import PostCollection from '@/components/PostCollection.vue'

describe('PostCollection.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(PostCollection, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
