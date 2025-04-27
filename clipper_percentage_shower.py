import cv2
import os

# Global variables
drawing = False  # Indicates if the user is selecting a region
start_x, start_y, end_x, end_y = 0, 0, 0, 0
image = None
orig_image = None
img_path = ""
output_file = "output.txt"

def format_path(raw_path):
    """Convert Windows-style paths (with `\`) into UNIX-style (`/`) and add `./` prefix."""
    return "./" + raw_path.replace("\\", "/")

def write_to_file(image_path, inset_values):
    """Writes the processed image path and inset values to a text file."""
    with open(output_file, "a") as file:
        file.write(f"Processed Image: {image_path}\n")
        file.write(f"CSS inset values: {inset_values}\n\n")

def draw_rectangle(event, x, y, flags, param):
    """Handles the selection of a rectangular region and calculates CSS inset values."""
    global start_x, start_y, end_x, end_y, drawing, image, orig_image, img_path

    if event == cv2.EVENT_LBUTTONDOWN:  # Mouse click start
        drawing = True
        start_x, start_y = x, y

    elif event == cv2.EVENT_MOUSEMOVE and drawing:  # Dragging
        temp_image = image.copy()
        cv2.rectangle(temp_image, (start_x, start_y), (x, y), (0, 255, 0), 2)
        cv2.imshow("Select Area", temp_image)

    elif event == cv2.EVENT_LBUTTONUP:  # Mouse release
        drawing = False
        end_x, end_y = x, y
        cv2.rectangle(image, (start_x, start_y), (end_x, end_y), (0, 255, 0), 2)
        cv2.imshow("Select Area", image)

        # Compute percentages
        img_h, img_w = orig_image.shape[:2]
        left = round((start_x / img_w) * 100, 2)
        right = round((100 - (end_x / img_w) * 100), 2)
        top = round((start_y / img_h) * 100, 2)
        bottom = round((100 - (end_y / img_h) * 100), 2)

        inset_values = f"inset: {top}% {right}% {bottom}% {left}%;"

        print("\nProcessed Image:", img_path)
        print(f"CSS inset values: {inset_values}")

        # Write to file
        write_to_file(img_path, inset_values)

        # Close the image window automatically after processing
        cv2.destroyAllWindows()

def process_image(image_path):
    """Loads and processes a single image."""
    global image, orig_image, img_path, drawing
    img_path = format_path(image_path)

    orig_image = cv2.imread(img_path)
    if orig_image is None:
        print(f"Error: Image not found at {img_path}!")
        return

    drawing = False  # Reset drawing state for each image
    image = orig_image.copy()
    cv2.imshow("Select Area", image)
    cv2.setMouseCallback("Select Area", draw_rectangle)
    cv2.waitKey(0)  # Waits for selection
    cv2.destroyAllWindows()  # Ensure window closes after selection

def main():
    """Main loop to take multiple inputs and process images until 'exit' is typed."""
    print(f"Results will be saved in '{output_file}'")
    
    # Clear the output file before starting new entries
    open(output_file, "w").close()

    while True:
        user_input = input("\nEnter image path (or type 'exit' to quit): ").strip()
        if user_input.lower() == "exit":
            print(f"Results saved in '{output_file}'. Exiting program...")
            break
        process_image(user_input)

if __name__ == "__main__":
    main()
