import {View, Text, Image} from 'react-native';
import React from 'react';
import {Pet} from '../../../data/model';
import {Checkbox} from 'native-base';
import {Drawables} from '../../../assets/images';
import {Fonts} from '../../../assets/fonts/index';

type Props = {
  pet: Pet;
  onChange(isChecked: boolean): void;
};

const ItemPetSelection = ({pet, onChange}: Props) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <Checkbox value="" onChange={isSelected => onChange(isSelected)}>
        {pet?.petImage.image1 && pet?.petImage.image1 !== 'string' ? (
          <Image
            resizeMode="cover"
            source={{uri: pet.petImage.image1}}
            style={{width: 60, height: 60}}
          />
        ) : (
          <Image source={Drawables.ic_image} style={{width: 60, height: 60}} />
        )}
        <Text style={{fontFamily: Fonts.ROBOTO_MEDIUM, fontSize: 18}}>
          {pet.name}
        </Text>
        <Text style={{fontFamily: Fonts.ROBOTO_MEDIUM, fontSize: 18}}>
          {pet.nameType}
        </Text>
      </Checkbox>
    </View>
  );
};

export default ItemPetSelection;
