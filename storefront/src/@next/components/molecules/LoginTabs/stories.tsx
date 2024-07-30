import { Story } from "@storybook/react";
import React from "react";

/* import { user } from "./fixtures"; */
import { LoginTabs } from "./LoginTabs";
import { IProps } from "./types";

export default {
  title: "@components/molecules/LoginTabs",
  component: LoginTabs,
};

const Template: Story<IProps> = args => <LoginTabs {...args} />;

export const Login = Template.bind({});
Login.args = { active: "login" };

export const Register = Template.bind({});
Register.args = { active: "register" };
