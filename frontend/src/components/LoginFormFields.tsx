import { Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

export function LoginFormFields() {
  return (
    <>
      <EmailFormField />
      <Form.Item
        name="privateKey"
        label="Private key"
        rules={[
          {
            required: true,
            message: 'Please input your private key!',
          },
          { type: 'string', min: 8 },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="***********"
          spellCheck={false}
        />
      </Form.Item>
    </>
  );
}

export function EmailFormField() {
  return (
    <Form.Item
      name="email"
      label="Email"
      rules={[{ type: 'email' }, { type: 'string', min: 7, required: true }]}
    >
      <Input
        prefix={<MailOutlined />}
        placeholder="user@mail.ru"
        spellCheck={false}
      />
    </Form.Item>
  );
}
