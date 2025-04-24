import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddTaskForm = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold mb-4">Add New Task</h1>
      <Formik
        initialValues={{ title: '', description: '' }}
        validationSchema={Yup.object({
          title: Yup.string().required('Title is required'),
          description: Yup.string().required('Description is required'),
        })}
        onSubmit={async (values, { resetForm }) => {
          const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          if (response.ok) {
            alert('Task added successfully!');
            resetForm();
          } else {
            alert('Failed to add task');
          }
        }}
      >
        <Form className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <Field
              name="title"
              data-testid="title-input"
              className="w-full border p-2 rounded"
              placeholder="Enter task title"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <Field
              name="description"
              as="textarea"
              data-testid="description-input"
              className="w-full border p-2 rounded"
              placeholder="Enter description"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTaskForm;
