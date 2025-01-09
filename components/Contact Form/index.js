import * as Yup from "yup";
import Button from "./Button";
import { useState } from "react";
import { handleSubmit } from "./logic";
import styles from "./index.module.css";
import InputMask from "react-input-mask";
import { Formik, Form, Field, useField } from "formik";
import { useStore } from "@components/Store";

const FormSchema = Yup.object().shape({
  name: Yup.string().min(2).max(64).required(),
  phone: Yup.string()
    .required()
    .matches(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/),
  email: Yup.string().email().required(),
  message: Yup.string(),
  toggle: Yup.bool().oneOf([true]),
});

export default function ContactForm({
  setStage,
  data,
  config = false,
  inputColors = {
    error: "!border-red-500 !bg-red-100",
    focus: "focus-visible:!border-primary-gray-dark",
    default: "bg-white border-[#8A8A8E]",
  },
  buttonColors = {
    error: "!bg-red-500 !border-red-500",
    success: "!bg-green-500 !border-green-500",
    default:
      "bg-theme-red  border-theme-red hover:border-theme-red focus-visible:border-theme-red",
  },
  inputHeight = "h-[2.875rem]",
  textareaHeight = "min-h-40 h-full",
}) {
  const { total, guests, discounts } = useStore();
  const [sendingStatus, setSendingStatus] = useState("notSending");

  const inputStyles = `outline-none rounded-none placeholder:text-[#8A8A8E] appearance-none duration-200 transition-colors shadow-none box-border align-middle border w-full ${inputColors.default} ${inputColors.focus}`;
  const btnClassname = "theme-button";

  const CustomField = ({ mask, ...props }) => {
    const [field] = useField(props);
    return <InputMask maskChar="_" {...props} {...field} mask={mask} />;
  };

  const BUTTON_STATES = {
    notSending: {
      buttonText: data.configText.submitButton,
    },
    sending: {
      buttonText: data.configText.submitButton,
    },
    error: {
      buttonText: "Ошибка",
      state: buttonColors.error,
    },
    sent: {
      buttonText: "Отправлено",
      state: buttonColors.success,
    },
  };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          message: "",
          toggle: false,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, actions) => {
          handleSubmit(
            setSendingStatus,
            values,
            actions,
            config,
            total,
            guests,
            discounts,
            data,
            setStage
          );
        }}
      >
        {({ touched, errors }) => (
          <Form
            className={`${styles.form} md:w-full space-y-5 pb-16 pt-8 md:p-7 relative -mx-3 md:mx-0 w-auto md:rounded-lg text-base text-center bg-[#F7F7F7] px-3`}
          >
            <div className="lg:space-x-4 lg:flex">
              <div className="space-y-2.5 lg:space-y-4 lg:w-1/2">
                <Field
                  placeholder={data.configText.namePlaceholder}
                  className={`${
                    touched.name && errors.name ? inputColors.error : ""
                  } ${inputStyles} ${inputHeight}`}
                  name="name"
                  disabled={sendingStatus !== "notSending"}
                />

                <CustomField
                  mask="+7 (999) 999-99-99"
                  placeholder={data.configText.phonePlaceholder}
                  className={`${
                    touched.phone && errors.phone ? inputColors.error : ""
                  } ${inputStyles} ${inputHeight} tabular-nums`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  disabled={sendingStatus !== "notSending"}
                />

                <Field
                  placeholder={data.configText.emailPlaceholder}
                  className={`${
                    touched.email && errors.email ? inputColors.error : ""
                  } ${inputStyles} ${inputHeight} `}
                  name="email"
                  type="email"
                  disabled={sendingStatus !== "notSending"}
                />
              </div>
              <div className="relative pt-2.5 lg:pt-0 flex-1 lg:w-1/2">
                <Field
                  name="message"
                  className={`${
                    touched.message && errors.message ? inputColors.error : ""
                  } ${inputStyles} ${textareaHeight}  `}
                  placeholder={data.configText.msgPlaceholder}
                  component="textarea"
                  disabled={sendingStatus !== "notSending"}
                />
              </div>
            </div>
            <div className="text-[#676669] pb-3 md:pb-0 pl-4 md:pl-0">
              <div className="flex items-center space-x-3 md:pl-5 ">
                <Field
                  className={`${
                    touched.toggle && errors.toggle ? "ring-2 " : ""
                  } focus-visible:ring-2 ring-theme-red ring-offset-2 outline-none rounded-none border border-[#676669]`}
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                />
                <label htmlFor="toggle">
                  <div
                    className="text-xs max-w-[14rem] md:max-w-none text-left"
                    dangerouslySetInnerHTML={{
                      __html: data.configText.privacyMarkdown,
                    }}
                  ></div>
                </label>
              </div>
              <div
                className="pt-2 text-xs text-left pl-7 md:pt-1 md:pl-12"
                dangerouslySetInnerHTML={{
                  __html: data.configText.eventPrivacyMarkdown,
                }}
              ></div>
            </div>
            <Button
              type="submit"
              isLoading={sendingStatus === "sending"}
              disabled={sendingStatus !== "notSending"}
              className={`${btnClassname} ${buttonColors.default} ${BUTTON_STATES[sendingStatus]["state"]}`}
            >
              {BUTTON_STATES[sendingStatus].buttonText}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
