import * as Yup from "yup";
import Button from "./Button";
import { useState } from "react";
import { handleSubmit } from "./logic";
import styles from "./index.module.css";
import InputMask from "react-input-mask";
import { Formik, Form, Field, useField } from "formik";
import PopoverButtonExtra from "./PopoverButtonExtra";
import { Calendar } from "@components/calendar/Calendar";
import { now } from "@internationalized/date";
import Modal from "@components/Modal";
import Success from "@components/Configurator/Success";

const FormSchema = Yup.object().shape({
  name: Yup.string().min(2).max(64).required(),
  phone: Yup.string()
    .required()
    .matches(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/),
  email: Yup.string().email().required(),
});

export default function ContactForm({
  data,
  config = false,
  inputColors = {
    error: "!border-red-500 !bg-red-100",
    focus: "focus-visible:!border-primary-dark",
    default: "bg-white border-white",
  },
  buttonColors = {
    error: "!bg-red-500 !border-red-500",
    success: "!bg-green-500 !border-green-500",
    default:
      "bg-theme-red  border-theme-red hover:border-theme-red focus-visible:border-theme-red",
  },
  inputHeight = "h-[4.25rem]",
}) {
  const [sendingStatus, setSendingStatus] = useState("notSending");
  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const inputStyles = `outline-none placeholder:text-[#9B9A9E] appearance-none duration-200 transition-colors shadow-none box-border align-middle rounded-none border w-full ${inputColors.default} ${inputColors.focus}`;
  const btnClassname = "theme-button";

  function getCurrentDate(date) {
    return `${date.day.toString().padStart(2, "0")}.${date.month
      .toString()
      .padStart(2, "0")}.${date.year.toString().padStart(2, "0")}`;
  }

  const CustomField = ({ mask, ...props }) => {
    const [field] = useField(props);
    return <InputMask maskChar="_" {...props} {...field} mask={mask} />;
  };

  const BUTTON_STATES = {
    notSending: {
      buttonText: data.configText.submitButtonOrder,
    },
    sending: {
      buttonText: data.configText.submitButtonOrder,
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
        }}
        validationSchema={FormSchema}
        onSubmit={(values, actions) => {
          if (date) {
            handleSubmit(
              setSendingStatus,
              setDate,
              values,
              actions,
              config,
              date,
              setIsOpen
            );
          }
        }}
      >
        {({ touched, errors }) => (
          <Form className={`${styles.form} w-full text-base text-center`}>
            <div className="grid gap-[0.625rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-5">
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
              <PopoverButtonExtra
                disabled={sendingStatus !== "notSending"}
                setIsPopoverOpen={setIsPopoverOpen}
                isPopoverOpen={isPopoverOpen}
                className={`${
                  touched.email && !date ? inputColors.error : ""
                } ${inputStyles} !px-0 ${inputHeight} tabular-nums   `}
                mainTitle={date && getCurrentDate(date)}
                title={data.configText.datePlaceholder}
              >
                <Calendar
                  minValue={now("Europe/Moscow")}
                  value={date}
                  onChange={(date) => {
                    setDate(date);
                    setIsPopoverOpen(false);
                  }}
                />
              </PopoverButtonExtra>
            </div>

            <Button
              type="submit"
              isLoading={sendingStatus === "sending"}
              disabled={sendingStatus !== "notSending"}
              className={`${btnClassname} !h-auto !w-auto mt-10 ${buttonColors.default} ${BUTTON_STATES[sendingStatus]["state"]}`}
            >
              {BUTTON_STATES[sendingStatus].buttonText}
            </Button>
          </Form>
        )}
      </Formik>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Success
          setIsOpen={setIsOpen}
          thanks={data.configText.thanks}
          thanksText={data.configText.thanksTextOrder}
          thanksButton={data.configText.thanksButton}
        />
      </Modal>
    </>
  );
}
