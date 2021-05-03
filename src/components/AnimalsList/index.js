import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Animal from "../Animal/Animal";
import AnimalsCarousel from "../AnimalsCarousel";
import YoutubeEmbed from "../YoutubeEmbed";
import useSelectedAnimal from "../../hooks/useSelectedAnimal";
import useAnimals from "../../hooks/useAnimals";

function AnimalsList() {
  // hook created to collect all the animals from the API
  //console.log(animals);
  const [selectedAnimal, fetchAnimal, isLoading] = useSelectedAnimal();
  const [optionToShow, setOptionToShow] = useState("video");
  const animals = useAnimals();
  const [modal, setModal] = useState(false);

  const getSelectedAnimal = (e) => {
    const { id, contentType } = e.target.dataset; //convention in React? To clarify with Patrick
    fetchAnimal(id);
    console.log(selectedAnimal);
    setOptionToShow(contentType);
    toggle();
  };

  const modalContent = {
    carousel: <AnimalsCarousel animal={selectedAnimal} />,
    video: <YoutubeEmbed embedId={selectedAnimal.idVideo} />,
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div className="AnimalsList mb-5">
      {animals.map((animal, index) => {
        return (
          <Animal
            animal={animal}
            getSelectedAnimal={getSelectedAnimal}
            key={index}
          />
        );
      })}

      <Modal
        isOpen={modal}
        toggle={toggle}
        className="bg-primary rounded-lg modal-lg"
      >
        <ModalHeader
          className="bg-primary bg-third rounded-top"
          toggle={toggle}
        ></ModalHeader>
        <ModalBody className="bg-primary justify-content-center px-2">
          {!isLoading && modalContent[optionToShow]}
        </ModalBody>
        <ModalFooter className="bg-primary">
          <Button
            color="secondary"
            onClick={toggle}
            className="bg-third text-fourth"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AnimalsList;
