const { dateToString} = require('../helpers/date');
const model = require('../models/model.js');



const fc_events = async eventIds => {
    try {
        const events = await model.Film.find({_id: {$in: eventIds}});
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    }
}

const fc_user = async userId => {
    try {
        const user = await model.User.findById(userId);
        return {
            ...user.doc,
            _id: user.id,
            bookedFimls: fc_events.bind(this, user._doc.bookedFimls)
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const singleEvent = async eventId => {
    try {
        const event = await model.Film.findById(eventId);
        return transformEvent(event);
    } catch (err) {
        throw err;
    }
}

const transformEvent = event =>{
    return {
        ...event._doc,
        _id: event.id
       // , date: dateToString(event._doc.date)
        //, user: fc_user.bind(this, event.user)
    };
}

const transformBooking = booking =>{
    return {
        ...booking._doc,
        _id: booking.id,
        user: fc_user.bind(this, booking._doc.user ),
        event: singleEvent.bind(this, booking._doc.film)
        //, createdAt: dateToString(booking._doc.createdAt),
        //updatedAt: dateToString(booking._doc.createdAt)
    };
}

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;


/*
exports.fc_user = fc_user;
exports.fc_events = fc_events;
exports.singleEvent = singleEvent;*/
