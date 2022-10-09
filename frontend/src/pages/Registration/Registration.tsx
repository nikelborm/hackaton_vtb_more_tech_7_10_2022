import { Button, Form, message } from 'antd';
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
            down these keys:
          </p>
          <p>Private wallet key: </p>
          <pre>{data.walletPrivatePublicKeyPair.privateKey}</pre>
          <p>Public wallet key:</p>
          <pre>{data.walletPrivatePublicKeyPair.publicKey}</pre>
          <p>
            It is your wallet keys. If you will lost them, you will be unable to
            make any payments and even login to your account.
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
