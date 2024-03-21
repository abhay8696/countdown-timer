import React from 'react';
//components
import Card from "./Card"

const CardsSection = ({timeObject, userMessage}) => {
    return (
      <section className='cardsSection'>
        <Card value={timeObject.days} type={"Days"}/>
        <Card value={timeObject.hours} type={"Hours"}/>
        <Card value={timeObject.minutes} type={"Minutes"}/>
        <Card value={timeObject.seconds} type={"Seconds"}/>
      </section>
    )
  }

export default CardsSection;