import { shallowMount } from '@vue/test-utils';
import ResetPassword from '@/components/views/ResetPassword';
import Password from '@/components/views/bits/Password';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Context from '@/Context.js';

Vue.use(Vuetify);
Vue.use(VueRouter);

describe('ResetPassword.test.js', () => {
  let wrapper;
  Context.init({});

  beforeEach(() => {
    wrapper = shallowMount(ResetPassword);
  });

  it('renders correctly (snapshots matching)', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('deactivates submit button when form is not yet filled', () => {
    const submitButton = wrapper.find('#submitButton');
    expect(wrapper.vm.validForm).toBe(false);
    expect(submitButton.attributes().disabled).toBe('true');
  });

  it('activates submit button when form is valid', () => {
    wrapper.setData({
      validForm: true,
    });
    const submitButton = wrapper.find('#submitButton');
    expect(submitButton.attributes().disabled).toBeFalsy();
  });

  it('validates required fields correctly', () => {
    const requiredRule = wrapper.vm.rules.required;
    expect(requiredRule()).toBe('This field is required.');
    expect(requiredRule('notEmpty')).toBe(true);
  });

  it('shows password reset form by default', () => {
    // Renders password reset form
    const pageTitle = wrapper.find('h1').text();
    expect(pageTitle).toBe('Reset password');
    const submitButton = wrapper.find('#submitButton');
    expect(submitButton.text()).toBe('Request password reset');
    const usernameOrEmail = wrapper.find('#usernameOrEmail');
    expect(usernameOrEmail.exists()).toBe(true);
    // Does not ask for password
    const password = wrapper.find(Password);
    expect(password.exists()).toBe(false);
  });

  it('shows password change form when resetToken is provided', () => {
    wrapper.setProps({
      resetToken: 'reset',
    });
    // Renders password change form
    const pageTitle = wrapper.find('h1').text();
    expect(pageTitle).toBe('Set a new password');
    const submitButton = wrapper.find('#submitButton');
    expect(submitButton.text()).toBe('Change password');
    const usernameOrEmail = wrapper.find('#usernameOrEmail');
    expect(usernameOrEmail.exists()).toBe(true);
    // Ask for password
    const password = wrapper.find(Password);
    expect(password.exists()).toBe(true);
  });
});
