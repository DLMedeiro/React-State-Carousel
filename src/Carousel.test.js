import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it('matches snapshot', function () {
  const {asFragment} = render(<Carousel/>);
  expect(asFragment()).toMatchSnapshot();
})


it("works when you click on the right and left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");

  // expect the first image to show, but not the second, and the left arrow to not show
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(leftArrow).toHaveClass('null');

  // move forward in the carousel (image 2)
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move forward in the carousel to end and remove right arrow
  fireEvent.click(rightArrow);
  expect(rightArrow).toHaveClass('null');

  // move backward in the carousel
  fireEvent.click(leftArrow);

  // expect the second image to show, but not the last
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
});
