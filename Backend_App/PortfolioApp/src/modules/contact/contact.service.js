import { emailEvent, NotFoundException, sendEmail } from "../../common/utils/index.js";
import { ContactModel } from "../../DB/models/contact.model.js";

export const getContact = async () => {

  const contact = await ContactModel.findOne();

  if (!contact) {
    NotFoundException({message:'Contact data not found'});
  }

  return contact;
};


export const updateContact = async (data) => {

  const contact = await ContactModel.findOneAndUpdate(
    {},
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!contact) {
    NotFoundException({ message: 'Contact data not found' });
  }

  return contact;
};



export const sendContactEmail = async ({ name, email, reason, message }) => {

  const contact = await ContactModel.findOne();

  if (!contact) {
    NotFoundException({ message: 'Contact data not found' });
  }

  emailEvent.emit("SendEmail", async () => {
    await sendEmail({
      to: contact.email,
      name,
      email,
      reason,
      message,
    });
  });

  return { message: 'Your message has been sent successfully' };
};