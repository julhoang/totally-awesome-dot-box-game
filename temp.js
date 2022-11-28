function getAttached(curr_box) {
  //1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
  up = 0;
  down = 0;
  left = 0;
  right = 0;
  if (curr_box == 6 || curr_box == 7 || curr_box == 10 || curr_box == 11) {
    up = curr_box - GridSize;
    down = curr_box + GridSize;
    left = curr_box - 1;
    right = curr_box + 1;
  } else if (curr_box == 5 || curr_box == 9) {
    up = curr_box - GridSize;
    down = curr_box + GridSize;
    right = curr_box + 1;
  } else if (curr_box == 1) {
    down = curr_box + GridSize;
    right = curr_box + 1;
  } else if (curr_box == 13) {
    up = curr_box - GridSize;
    right = curr_box + 1;
  } else if (curr_box == 4) {
    down = curr_box + GridSize;
    left = curr_box - 1;
  } else if (curr_box == 2 || curr_box == 3) {
    down = curr_box + GridSize;
    left = curr_box - 1;
    right = curr_box + 1;
  } else if (curr_box == 3) {
    down = curr_box + GridSize;
    left = curr_box - 1;
    right = curr_box + 1;
  } else if (curr_box == 8 || curr_box == 12) {
    up = curr_box - GridSize;
    down = curr_box + GridSize;
    left = curr_box - 1;
  } else if (curr_box == 16) {
    up = curr_box - GridSize;
    left = curr_box - 1;
  } else if (curr_box == 14 || curr_box == 15) {
    up = curr_box - GridSize;
    left = curr_box - 1;
    right = curr_box + 1;
  }

  ret_list = new Array(up, down, left, right);
  return ret_list;
}
