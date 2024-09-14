export const is_valid_phone_number = (phone_number) => {
    const regex = /^(?:\+57|57)?[1-9][0-9]{9}$/;
    return regex.test(phone_number); 
}