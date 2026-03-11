import { Button, Form, Modal } from "antd"
import type { FormProps } from "antd"

type Props<T> = {
  modal: {
    open: boolean
    type: 'create' | 'edit'
  }
  title: string
  onCancel: () => void
  onSubmit: (data: T) => void
  children: React.ReactNode
}

function ModalForm<T>(props: Props<T>) {
  const {
    modal,
    title,
    onSubmit,
    onCancel,
    children,
  } = props

  const modalTitle = modal.type === 'create' ? `Create ${title}` : `Edit ${title}`

  return (
    <Modal
      title={modalTitle}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={modal.open}
      footer={null}
      onCancel={onCancel}
      styles={{
        container: {
          paddingBottom: 0
        }
      }}
    >
      <Form<T>
        name={`form-title`}
        layout="vertical"
        onFinish={onSubmit as FormProps<T>['onFinish']}
        autoComplete="off"
        className="text-left w-full"
      >
        {children}

        <div className="flex justify-end gap-2!">
          <Button onClick={onCancel} color="danger">Cancel</Button>
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
