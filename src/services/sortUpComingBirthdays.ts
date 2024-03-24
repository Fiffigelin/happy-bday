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
      dateA.getTime() >= today.getTime() &&
      dateB.getTime() >= today.getTime()
    ) {
      return dateA.getTime() - dateB.getTime();
    } else if (dateA.getTime() >= today.getTime()) {
      return -1;
    } else if (dateB.getTime() >= today.getTime()) {
      return 1;
    } else {
      return dateA.getTime() - dateB.getTime();
    }
  });

  const upcomingBirthdays = sortedContacts.slice(0, 3);
  console.log(upcomingBirthdays);
  return upcomingBirthdays;
}
