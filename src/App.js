import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { useState } from 'react';
function App() {
  let [batteryRequired, setBatteryRequired] = useState(0)
  let [solarRequired, setSolarRequired] = useState(0)
  const [form] = Form.useForm();
  const onFinish = () => {
    console.log("1111")
    let dayArray = [];
    let nightArray = []
    let dayTotalPower = 0;
    let nightTotalPower = 0;
    if (form.getFieldsValue().day) {
      dayArray = [...form.getFieldsValue().day]
      dayArray.forEach((obj) => {
        dayTotalPower += (Number(Object.values(obj)[0]) * Number(Object.values(obj)[1]) * Number(Object.values(obj)[2]))
      })
    }
    if (form.getFieldsValue().night) {
      nightArray = [...form.getFieldsValue().night]
      nightArray.forEach((obj) => {
        nightTotalPower += (Number(Object.values(obj)[0]) * Number(Object.values(obj)[1]) * Number(Object.values(obj)[2]))
      })
    }
    let solarPanel = 0;
    let batteryAh = 0;
    if (nightTotalPower && dayTotalPower) {
      solarPanel = (nightTotalPower + dayTotalPower) / 5;
      batteryAh = nightTotalPower / 12;
    }
    else if (nightTotalPower && !dayTotalPower) {
      solarPanel = (nightTotalPower) / 5;
      batteryAh = nightTotalPower / 12;
    }
    else if (!nightTotalPower && dayTotalPower) {
      solarPanel = (dayTotalPower) / 5;
    }
    solarPanel=solarPanel.toFixed(2)
    batteryAh=batteryAh.toFixed(2)
    setSolarRequired(solarPanel)
    setBatteryRequired(batteryAh)
  }
  return (
    <div className="App">
      <h2>Battery Ah={batteryRequired}</h2>
      <h2>Solar Watt={solarRequired}</h2>
      <h2></h2>
      <Form
        form={form}
        onFinish={onFinish}
      >
        <div className='row'>
          <div className='col-12 col-md-6'>
            <h2>Night</h2>
            <Form.List name="night">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'Power']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing power',
                          },
                        ]}
                      >
                        <Input placeholder="Power" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'Quantity']}
                        rules={[
                          {
                            required: true,
                            message: 'Quantity required',
                          },
                        ]}
                      >
                        <Input placeholder="Quantity" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'Hour']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing hour name',
                          },
                        ]}
                      >
                        <Input placeholder="Hour" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <div className='col-12 col-md-6'>
            <h2>Day</h2>
            <Form.List name="day">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'Power']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing power',
                          },
                        ]}
                      >
                        <Input placeholder="Power" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'Quantity']}
                        rules={[
                          {
                            required: true,
                            message: 'Quantity required',
                          },
                        ]}
                      >
                        <Input placeholder="Quantity" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'Hour']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing hour name',
                          },
                        ]}
                      >
                        <Input placeholder="Hour" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
