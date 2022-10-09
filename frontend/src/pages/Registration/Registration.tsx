import { Button, Form, message, Typography } from 'antd';
import {
  AuthFormSubmitButton,
  CenteredAuthFormHeader,
  RegistrationFormFields,
} from 'components';
import { useRegistrationMutation, useTokenPairUpdater } from 'hooks';
import { Link } from 'react-router-dom';

export function Registration() {
  const [form] = Form.useForm();
  const { sendRegistrationQuery, data } = useRegistrationMutation();
  const { updateTokenPair } = useTokenPairUpdater();

  return (
    <>
      <CenteredAuthFormHeader>Registration</CenteredAuthFormHeader>
      {data ? (
        <div>
          <p>
            Your registration was successful. Before you continue, please write
            these keys down:
          </p>
          <p style={{ fontWeight: 'bold' }}>Private wallet key: </p>
          <pre>{data.walletPrivatePublicKeyPair.privateKey}</pre>
          <p style={{ fontWeight: 'bold' }}>Public wallet key:</p>
          <pre>{data.walletPrivatePublicKeyPair.publicKey}</pre>
          <p>
            It is your wallet keys. If you lose the private key, you will be
            unable to make any payments or even log in to your account.
          </p>
          <p>
            <Typography.Text type="danger">
              Do not share your private key with anyone!
            </Typography.Text>
          </p>
          <Button
            type="primary"
            onClick={() => updateTokenPair(data.authTokenPair)}
          >
            I wrote them down and ready to continue!
          </Button>
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={sendRegistrationQuery}
          onFinishFailed={onFinishCreationFailed}
          autoComplete="off"
        >
          <RegistrationFormFields />
          <AuthFormSubmitButton
            buttonText="Create account"
            link={<Link to="/auth/login">enter your account!</Link>}
          />
        </Form>
      )}
    </>
  );
}

const onFinishCreationFailed = () => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  message.error('Submit failed!');
};
