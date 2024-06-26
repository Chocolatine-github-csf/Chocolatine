const Preset = require('./schema/presetSchema');
const { logger } = require('~/config');
const { isTeacherMode } = require('./TeacherMode');

const getPreset = async (user, presetId) => {
  try {
    return await Preset.findOne({ user, presetId }).lean();
  } catch (error) {
    logger.error('[getPreset] Error getting single preset', error);
    return { message: 'Error getting single preset' };
  }
};

module.exports = {
  Preset,
  getPreset,
  getPresets: async (user, filter) => {
    try {
      const presets = await Preset.find({ ...filter, user }).lean();

      const presetsTeacher = await Preset.find({ title: { $regex: 'Professeur' } }).lean();

      const defaultValue = 10000;

      presets.sort((a, b) => {
        let orderA = a.order !== undefined ? a.order : defaultValue;
        let orderB = b.order !== undefined ? b.order : defaultValue;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        return b.updatedAt - a.updatedAt;
      });

      if (isTeacherMode()) {
        return presetsTeacher;
      } else {
        return presets;
      }
    } catch (error) {
      logger.error('[getPresets] Error getting presets', error);
      return { message: 'Error retrieving presets' };
    }
  },
  savePreset: async (user, { presetId, newPresetId, defaultPreset, ...preset }) => {
    try {
      const setter = { $set: {} };
      const update = { presetId, ...preset };
      if (preset.tools && Array.isArray(preset.tools)) {
        update.tools =
          preset.tools
            .map((tool) => tool?.pluginKey ?? tool)
            .filter((toolName) => typeof toolName === 'string') ?? [];
      }
      if (newPresetId) {
        update.presetId = newPresetId;
      }

      if (defaultPreset) {
        update.defaultPreset = defaultPreset;
        update.order = 0;

        const currentDefault = await Preset.findOne({ defaultPreset: true, user });

        if (currentDefault && currentDefault.presetId !== presetId) {
          await Preset.findByIdAndUpdate(currentDefault._id, {
            $unset: { defaultPreset: '', order: '' },
          });
        }
      } else if (defaultPreset === false) {
        if(isTeacherMode()) {
          const presetToDefault = await Preset.findById("c838ee87-ec6e-4b7c-a0e3-8b970cd9f0e3");
          if (presetToDefault) {
            presetToDefault.defaultPreset = true;
            presetToDefault.order = 0;
            await presetToDefault.save();
          }
        }
        else {
          update.defaultPreset = undefined;
          update.order = undefined;
          setter['$unset'] = { defaultPreset: '', order: '' };
        }
      }

      setter.$set = update;
      return await Preset.findOneAndUpdate({ presetId, user }, setter, { new: true, upsert: true });
    } catch (error) {
      logger.error('[savePreset] Error saving preset', error);
      return { message: 'Error saving preset' };
    }
  },
  deletePresets: async (user, filter) => {
    // let toRemove = await Preset.find({ ...filter, user }).select('presetId');
    // const ids = toRemove.map((instance) => instance.presetId);
    let deleteCount = await Preset.deleteMany({ ...filter, user });
    return deleteCount;
  },
};
