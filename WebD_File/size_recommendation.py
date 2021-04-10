
# chart_dict = {'size': ['S', 'M', 'L', 'XL', 'XXL'], 'chest': [34, 36, 38, 40, 42], 'front_length': [23.5, 24, 24.5, 25, 25.5], 'shoulder': [14, 14.5, 15, 15.5, 16]}

# chest = float(input("Enter chest size: "))
# front_len = float(input("Enter frontal length: "))
# shoulder = float(input("Enter shoulder length: "))

# #recom_size = 0

# chest_diff = abs(chest - chart_dict['chest'][0])
# front_len_diff = abs(front_len - chart_dict['front_length'][0])
# shoulder_diff = abs(shoulder - chart_dict['shoulder'][0])
# sum = chest_diff + front_len_diff + shoulder_diff
# min_error = sum
# recom_size = chart_dict['size'][0]
# for i in range(1,5):
#   chest_diff = abs(chest - chart_dict['chest'][i])
#   front_len_diff = abs(front_len - chart_dict['front_length'][i])
#   shoulder_diff = abs(shoulder - chart_dict['shoulder'][i])
#   sum = chest_diff + front_len_diff + shoulder_diff
#   if(sum < min_error):
#     min_error = sum
#     recom_size = chart_dict['size'][i]
    
# print("Recommended size: ", recom_size)

def testing(chest,front_len,shoulder) :
  chart_dict = {'size': ['S', 'M', 'L', 'XL', 'XXL'], 'chest': [34, 36, 38, 40, 42], 'front_length': [23.5, 24, 24.5, 25, 25.5], 'shoulder': [14, 14.5, 15, 15.5, 16]}
  print(type(chest))
  chest_diff = abs(chest - chart_dict['chest'][0])
  front_len_diff = abs(front_len - chart_dict['front_length'][0])
  shoulder_diff = abs(shoulder - chart_dict['shoulder'][0])
  sum = chest_diff + front_len_diff + shoulder_diff
  min_error = sum
  recom_size = chart_dict['size'][0]
  for i in range(1,5):
    chest_diff = abs(chest - chart_dict['chest'][i])
    front_len_diff = abs(front_len - chart_dict['front_length'][i])
    shoulder_diff = abs(shoulder - chart_dict['shoulder'][i])
    sum = chest_diff + front_len_diff + shoulder_diff
    if(sum < min_error):
      min_error = sum
      recom_size = chart_dict['size'][i]
  print("Recommended size: ", recom_size)
  return recom_size 
  