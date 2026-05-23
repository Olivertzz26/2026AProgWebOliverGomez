import { subDays, format } from 'date-fns';

const date = new Date(1993, 1, 6);
const response = subDays(date, 1);
const string = format(response, 'yyyy/MM/dd');

console.log(string);