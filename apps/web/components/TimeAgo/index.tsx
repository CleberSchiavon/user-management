import React, { useEffect, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';

const TimeAgo = ({ date }) => {
    const [timeAgo, setTimeAgo] = useState('');
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const dateObj = new Date(date);
        
        setFormattedDate(format(dateObj, 'dd/MM/yyyy HH:mm'));

        const interval = setInterval(() => {
            setTimeAgo(formatDistanceToNow(dateObj, { addSuffix: true, locale: pt }));
        }, 60000); 

        setTimeAgo(formatDistanceToNow(dateObj, { addSuffix: true, locale: pt }));

        return () => clearInterval(interval);
    }, [date]);

    return <span>{`${formattedDate} (${timeAgo})`}</span>;
}

export default TimeAgo;