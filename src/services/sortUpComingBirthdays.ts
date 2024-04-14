import { Contact } from "@/types";

export function getUpcomingBirthdays(contacts: Contact[]): Contact[] {
  const sortedContacts = contacts.slice();

  sortedContacts.sort((a, b) => {
    const today = new Date();
    const dateA = new Date(
      today.getFullYear(),
      parseInt(a.short_birthday.split("-")[0]) - 1,
      parseInt(a.short_birthday.split("-")[1])
    );
    const dateB = new Date(
      today.getFullYear(),
      parseInt(b.short_birthday.split("-")[0]) - 1,
      parseInt(b.short_birthday.split("-")[1])
    );

    if (
      dateA.getMonth() === today.getMonth() &&
      dateA.getDate() === today.getDate()
    ) {
      return -1;
    } else if (
      dateB.getMonth() === today.getMonth() &&
      dateB.getDate() === today.getDate()
    ) {
      return 1;
    } else {
      return dateA.getTime() - dateB.getTime();
    }
  });

  const upcomingBirthdays = sortedContacts.slice(0, 3);
  return upcomingBirthdays;
}

export function parseDateToShortBirthDay(): string {
  const todaysDate = new Date();
  const month = todaysDate.getMonth() + 1;
  const day = todaysDate.getDate();

  const short_date =
    (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;
  return short_date;
}

/* 
  Future feature! Show how many days that are left to birthday in upcomingbirthday-cards
*/
export function countdownToBDay(contact: Contact): number {
  const today = new Date();
  const currentYear = today.getFullYear();
  const nextBirthday = new Date(
    currentYear,
    parseInt(contact.short_birthday.split("-")[0]) - 1,
    parseInt(contact.short_birthday.split("-")[1])
  );

  if (nextBirthday.getTime() < today.getTime()) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  const millisecondsLeft = nextBirthday.getTime() - today.getTime();
  const daysLeft = Math.ceil(millisecondsLeft / (1000 * 3600 * 24));

  return daysLeft;
}
