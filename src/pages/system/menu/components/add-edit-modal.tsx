import getIconPark from '@/utils/getIconPark';
import { extractProperties } from '@/utils/transformKeys';
import { Info } from '@icon-park/react';
import { ALL_ICON_KEYS } from '@icon-park/react/es/all';
import {
  ColorPicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Tooltip,
  TreeSelect,
} from 'antd';
import { useEffect, useState } from 'react';

function filterTree(tree: AUTH.MenuDTO[], idToRemove: string): AUTH.MenuDTO[] {
  return tree.reduce<AUTH.MenuDTO[]>((acc, node) => {
    if (node.id !== idToRemove) {
      const filteredChildren = node.childMenuList
        ? filterTree(node.childMenuList, idToRemove)
        : undefined;
      acc.push({
        ...node,
        childMenuList: filteredChildren,
      });
    }
    return acc;
  }, []);
}

export default function AddEditModal({
  record,
  allTreeData,
  loading,
  onOk,
  onCancel,
}: {
  record: AUTH.MenuDTO | null;
  allTreeData: AUTH.MenuDTO[];
  loading: boolean;
  onOk: (values: AUTH.MenuDTO) => void;
  onCancel: () => void;
}) {
  const [form] = Form.useForm();
  const [isCanCollect, setIsCanCollect] = useState(false);
  const [iconProps, setIconProps] = useState({
    theme: 'outline',
    fill: '#ffffff',
    background: '#2b2b2b',
    round: false,
  });

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      onOk({ ...record, ...values });
    });
  };

  const canCollectChange = (val: boolean) => {
    setIsCanCollect(val);
  };

  useEffect(() => {
    form.setFieldsValue({
      ...extractProperties(record as Record<string, unknown>, [
        'name',
        'path',
        'icon',
        'parentId',
        'order',
        'canSearch',
        'canCollect',
        'collectTargetMenuId',
      ]),
    });
    // setIsCanCollect(record?.canCollect as boolean);
  }, []);

  return (
    <Modal
      title={
        record && JSON.stringify(record) !== '{}' ? '编辑菜单' : '新增菜单'
      }
      open={true}
      width={600}
      onOk={() => handleOk()}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form
        form={form}
        labelCol={{
          style: { width: 100, textAlign: 'right' },
        }}
        style={{ marginTop: 20 }}
        autoComplete="off"
        initialValues={{
          menuType: 'menu',
          status: 'open',
          visible: 'show',
        }}
      >
        <Form.Item label="菜单名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="上级菜单" name="parentId">
          <TreeSelect
            className="w-full"
            showSearch
            fieldNames={{
              label: 'name',
              value: 'id',
              children: 'childMenuList',
            }}
            filterTreeNode={(input, treeNode) => {
              return treeNode?.name.includes(input);
            }}
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto',
            }}
            placeholder="请选择上级菜单"
            allowClear
            treeData={filterTree(allTreeData, record?.id as string)}
          />
        </Form.Item>
        <Form.Item label="菜单类型" name="menuType">
          <Radio.Group
            options={[
              { value: 'menu', label: '菜单' },
              { value: 'button', label: '按钮' },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        {Form.useWatch('menuType', form) === 'menu' && (
          <>
            <Form.Item
              label="菜单路径"
              name="path"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="菜单图标" name="icon">
              <Select
                placeholder="请搜索选择"
                suffixIcon={
                  <a
                    href="https://iconpark.oceanengine.com/official"
                    rel="noreferrer"
                    target="_blank"
                    style={{ pointerEvents: 'auto' }}
                  >
                    图标网站
                  </a>
                }
                allowClear
                showSearch
                listHeight={400}
                options={ALL_ICON_KEYS.map((item) => ({
                  label: (
                    <div className="my-0.5 flex gap-1 items-center">
                      <span
                        className="w-6 h-6 space_center"
                        style={{
                          background: iconProps.background,
                          borderRadius: iconProps.round ? '50%' : '4px',
                        }}
                      >
                        {getIconPark(item, {
                          theme: iconProps.theme,
                          fill: iconProps.fill,
                        })}
                      </span>
                      <span>{item}</span>
                    </div>
                  ),
                  value: item,
                }))}
                dropdownRender={(menu) => (
                  <div>
                    <div className="mb-2 flex gap-4">
                      <div className="space-y-1">
                        <div>图标风格</div>
                        <Radio.Group
                          size="small"
                          value={iconProps.theme}
                          options={[
                            { value: 'outline', label: '线性' },
                            { value: 'filled', label: '填充' },
                          ]}
                          optionType="button"
                          buttonStyle="solid"
                          onChange={(e) => {
                            setIconProps((prev) => ({
                              ...prev,
                              theme: e.target.value,
                            }));
                            e.preventDefault();
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <div>背景形状</div>
                        <Radio.Group
                          size="small"
                          value={iconProps.round}
                          options={[
                            { value: false, label: '矩形' },
                            { value: true, label: '圆形' },
                          ]}
                          optionType="button"
                          buttonStyle="solid"
                          onChange={(e) => {
                            setIconProps((prev) => ({
                              ...prev,
                              round: e.target.value,
                            }));
                            e.preventDefault();
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <div>图标颜色</div>
                        <ColorPicker
                          size="small"
                          value={iconProps.fill}
                          showText
                          presets={[
                            {
                              label: '推荐',
                              colors: [
                                '#F5222D',
                                '#FA8C16',
                                '#FADB14',
                                '#8BBB11',
                                '#52C41A',
                                '#13A8A8',
                                '#1677FF',
                                '#2F54EB',
                                '#722ED1',
                                '#EB2F96',
                                '#2b2b2b',
                              ],
                            },
                          ]}
                          onChange={(color) => {
                            setIconProps((prev) => ({
                              ...prev,
                              fill: color.toHexString(),
                            }));
                          }}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode as HTMLElement
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <div>背景颜色</div>
                        <ColorPicker
                          size="small"
                          value={iconProps.background}
                          showText
                          allowClear
                          presets={[
                            {
                              label: '推荐',
                              colors: [
                                '#F5222D',
                                '#FA8C16',
                                '#FADB14',
                                '#8BBB11',
                                '#52C41A',
                                '#13A8A8',
                                '#1677FF',
                                '#2F54EB',
                                '#722ED1',
                                '#EB2F96',
                                '#2b2b2b',
                                '#ffffff',
                                '',
                              ],
                            },
                          ]}
                          onChange={(color) => {
                            setIconProps((prev) => ({
                              ...prev,
                              background: color.toHexString(),
                            }));
                          }}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentNode as HTMLElement
                          }
                        />
                      </div>
                    </div>
                    {menu}
                  </div>
                )}
              />
            </Form.Item>
          </>
        )}
        {Form.useWatch('menuType', form) === 'button' && (
          <Form.Item label="权限标识" name="authorityKey">
            <Input placeholder="请输入" className="w-full" />
          </Form.Item>
        )}
        <Form.Item label="显示排序" name="order">
          <InputNumber placeholder="请输入" className="w-full" />
        </Form.Item>
        <Form.Item label="菜单状态" name="status">
          <Radio.Group
            options={[
              { value: 'open', label: '开启' },
              { value: 'close', label: '关闭' },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item
          label={
            <>
              显示状态
              <Tooltip title="在菜单中隐藏自己和子节点，选择隐藏时，路由将不会出现在侧边栏，但仍然可以访问">
                <Info className="ml-1" />
              </Tooltip>
            </>
          }
          name="visible"
        >
          <Radio.Group
            options={[
              { value: 'show', label: '显示' },
              { value: 'hidden', label: '隐藏' },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
