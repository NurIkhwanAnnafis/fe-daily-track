import { useState } from "react"
import { Button, Form, message, Modal, Upload } from "antd"
import { ThunderboltFilled, UploadOutlined } from '@ant-design/icons';
import type { FormInstance, FormProps, UploadFile, UploadProps } from "antd"
import './style.css'
import { useAi } from "../../hooks/useAi";
import dayjs from "dayjs";

type Props<T> = {
  modal: {
    open: boolean
    type: 'create' | 'edit'
  }
  title: string
  onCancel: () => void
  onSubmit: (data: T) => void
  children: React.ReactNode
  name: string
  form: FormInstance<T>
  generateByAi?: boolean
  prompt?: string
}

function ModalForm<T>(props: Props<T>) {
  const {
    modal,
    title,
    onSubmit,
    onCancel,
    children,
    name,
    form,
    generateByAi,
  } = props
  const { generateContent, loading } = useAi({
    onSuccess: (data: any) => {
      if (data.error) {
        message.error(data.error);
        return;
      }

      form.setFieldsValue({
        ...data,
        category_id: null,
        date: dayjs(data.date, 'YYYY-MM-DD HH:mm:ss'),
      })
    }
  })
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleCancel = () => {
    form.resetFields()
    setFileList([])
    onCancel()
  }

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
    styles: {
      root: { width: "100%" },
      item: { width: "100%" }
    },
    accept: "image/png,image/jpeg",
  };

  const modalTitle = modal.type === 'create' ? `Create ${title}` : `Edit ${title}`

  return (
    <Modal
      title={modalTitle}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={modal.open}
      footer={null}
      onCancel={handleCancel}
      styles={{
        container: {
          paddingBottom: 0
        }
      }}
    >
      <Form<T>
        form={form}
        name={name}
        layout="vertical"
        onFinish={onSubmit as FormProps<T>['onFinish']}
        autoComplete="off"
        className="text-left w-full pt-5!"
      >
        {!!generateByAi && (
          <div
            className="grid flex-col gap-3! mb-5! p-4! bg-slate-50/50! dark:bg-zinc-800/10! rounded-lg! items-start!"
          >
            <Upload {...uploadProps} className="block!">
              <Button className="w-full!" htmlType="button" icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <Button
              type="primary"
              className="w-max sm:w-auto! bg-gradient-to-r! from-emerald-500! to-green-500! border-none! hover:opacity-90! shadow-sm!"
              iconPlacement="end"
              icon={<ThunderboltFilled />}
              htmlType="button"
              onClick={() => {
                if (fileList.length === 0) {
                  message.warning('Please select a file')
                  return
                }
                generateContent(props.prompt ?? '', fileList)
              }}
              loading={loading}
              disabled={loading || fileList.length === 0}
            >
              Generate by AI
            </Button>
          </div>
        )}

        {children}

        <div className="flex justify-end gap-2!">
          <Button onClick={handleCancel} color="danger">Cancel</Button>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalForm
