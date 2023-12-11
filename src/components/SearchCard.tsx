import { Button, Card, ConfigProvider, Form } from 'antd';

export default function SearchCard({ ...props }) {
  const { title = '筛选条件', onSearch, labelWidth = 72 } = props;
  const [form] = Form.useForm();

  const search = () => {
    onSearch(form.getFieldsValue());
  };

  const reset = () => {
    form.resetFields();
    search();
  };

  const ButtonStyle =
    props?.children?.length > 3
      ? 'ml-4 flex flex-col space-y-[20px] pl-4 border-l'
      : 'ml-4 flex space-x-4';

  return (
    <Card
      bordered={false}
      className="custom-card custom-search-card"
      title={title}
    >
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 20,
            },
          },
        }}
      >
        <Form
          form={form}
          labelCol={{
            style: { width: labelWidth, textAlign: 'right' },
          }}
          labelWrap
          autoComplete="off"
          colon
        >
          <div className="flex">
            <div className="flex-auto grid gap-x-4 grid-cols-3">
              {props?.children}
            </div>
            <div className={ButtonStyle}>
              <Button onClick={reset}>重置</Button>
              <Button type="primary" onClick={search}>
                查询
              </Button>
            </div>
          </div>
        </Form>
      </ConfigProvider>
    </Card>
  );
}
